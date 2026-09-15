# Sale System with Oweru — System Architecture & Engineering Manual

**Audience:** any backend engineer joining this codebase — onboarding, debugging, extending.
**Scope:** `backend/` (NestJS + Prisma + MySQL) and its external-facing surfaces. The `frontend/`
SPA is referenced only where it shapes backend behavior (payload contracts, upload flow).
**Status:** describes the system as it is implemented in this repository today. Where the
production ops layer (PM2/aaPanel/XAMPP) is not itself part of this repo, §6 documents standard
operating procedure for that stack rather than a specific file that ships with the code.

> **Read this before anything else — a scope note.** A few items in this manual's brief describe
> target behavior that is **not yet implemented** in the current codebase. They're called out
> inline, in bold, at the exact point they diverge, and summarized in **Appendix A**. This manual
> documents what actually runs, not an aspirational version of it — so it stays trustworthy the
> next time someone opens a debugger against it.

---

## Table of Contents

1. [Executive Overview & Business Logic](#1-executive-overview--business-logic)
2. [System Architecture & Flow Diagrams](#2-system-architecture--flow-diagrams)
3. [Database Architecture & Schema Landscape](#3-database-architecture--schema-landscape)
4. [Implementation Matrix & Gateway Endpoints](#4-implementation-matrix--gateway-endpoints)
5. [Security Framework & Integrity Controls](#5-security-framework--integrity-controls)
6. [Deployment Pipeline, PM2 Runtime & Monitoring](#6-deployment-pipeline-pm2-runtime--monitoring)
7. [Appendix A — Spec Deltas](#appendix-a--spec-deltas-what-this-manual-would-not-let-pass-silently)

---

## 1. Executive Overview & Business Logic

### 1.1 What this system is

**Sale System with Oweru** is the listing intake and review backend for a Tanzanian real-estate
brand ("Sell With Oweru"). It ingests property submissions from a public web wizard across three
categories — **house for sale**, **land for sale**, **commercial area** (sale or rent) — holds
them in an internal review state, and lets an operations team approve, edit, or reject them from
an admin dashboard.

Once approved, a listing becomes eligible to synchronize outward in two independent directions:

1. **Internally**, into a flattened `Property` mirror table that the platform's own public read
   surface (`GET /properties`) serves.
2. **Externally**, to a corporate partner (Oweru OMS) through a bearer-token-gated B2B gateway
   (`/external/properties`) that reshapes live listing rows into the partner's contract on every
   call — it does not read from the mirror table.

### 1.2 The core boundary rule

> **Data only streams to a downstream consumer once an administrator explicitly transitions a
> listing's `status` to `APPROVE`/`APPROVED` from the workspace dashboard.**

This rule is enforced at exactly one seam: the `update()` method on each of the three listing
services (`HouseForSaleService`, `LandForSaleService`, `CommercialAreaService`). After the
existing Prisma `update()` call resolves — never before, never instead of it — each service
calls:

```ts
await this.propertyMirror.syncApproved(kind, id, updateDto.status);
```

`PropertyMirrorService.syncApproved()` is a **guarded no-op**: it inspects the incoming
`status` value and returns immediately unless it is `APPROVE` or `APPROVED` (case-insensitive).
No other code path — not `create()`, not a document/image upload, not a PATCH that leaves
`status` untouched — can trigger the mirror write. This is deliberate: the boundary is a single
`if` statement in a single method, not a distributed convention that could drift.

The external gateway does **not** independently re-check this rule — it reads whatever the
`status` column currently holds via its own `NOT_DELETED` filter (`status != 'DELETED'`). This
means the external feed's visibility rule is "not deleted," not "approved." See §4.3 and
Appendix A.

---

## 2. System Architecture & Flow Diagrams

### 2.1 Primary request path — dashboard & public site

```
┌──────────────┐     ┌────────────────────┐     ┌─────────────────────────┐     ┌───────────────────┐     ┌────────────────┐
│   Client      │     │  Admin Dashboard    │     │   NestJS Server App     │     │ Prisma Client      │     │  MySQL Engine   │
│  (browser)    │────▶│  (React SPA,        │────▶│   Layer                 │────▶│ (Gatekeeper)       │────▶│  Storage Node   │
│  public form  │     │   TanStack Query)    │     │  Controller → Service   │     │ generated client,   │     │  DB: oweruSales │
│  or workspace │◀────│                      │◀────│  → DTO validation       │◀────│ driver adapter      │◀────│  (or saledb per │
│               │     │                      │     │  → business logic       │     │ (@prisma/adapter-   │     │  environment)   │
└──────────────┘     └────────────────────┘     └─────────────────────────┘     │ mariadb)            │     └────────────────┘
                                                                                     └─────────────────────────┘
```

- **Client → Dashboard**: `axios`-based `services/api.ts`, base URL from `VITE_API_URL`
  (falls back to `https://saleapi.oweru.com`).
- **Dashboard → NestJS**: plain REST/JSON over HTTPS. No GraphQL, no gRPC layer.
- **NestJS App Layer**: each resource is its own Nest module
  (`house-for-sale`, `land-for-sale`, `commercial-area`, `brokers`, `owners`,
  `property-categories`, `regions`, `districts`, `wards`, `uploads`, `dashboard`, `auth`,
  `users`, `property-mirror`, `properties`, `external`). A global `ValidationPipe` (see §5.2) and
  a global `AllExceptionsFilter` (`src/common/all-exceptions.filter.ts`) wrap every request.
- **Prisma Client Gatekeeper**: `PrismaService` (`src/prisma.config/prisma.service.ts`) extends
  `PrismaClient`, constructed with `@prisma/adapter-mariadb` using **discrete** `DATABASE_HOST` /
  `DATABASE_PORT` / `DATABASE_USER` / `DATABASE_PASSWORD` / `DATABASE_NAME` env vars (not a
  single connection-string parse) — `PrismaModule` is `@Global()`, so every feature module gets
  `PrismaService` injected without re-importing it.
- **MySQL Engine Storage Node**: schema is Prisma-migration-driven (`prisma/migrations/*`), one
  physical database (`oweruSales` locally per `backend/.env`, environment-specific in
  production).
- **Static media**: `app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' })`
  in `main.ts` — uploaded files are served directly off disk under `/uploads/<filename>`, not
  streamed through Prisma.

### 2.2 B2B interconnect flow — `/external/properties`

```
┌────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐   ┌───────────────────────────┐   ┌──────────────────┐
│ Third-Party      │   │ ExternalAuthGuard     │   │ Route Discriminator   │   │ Serialization Transformer │   │ Response Delivery │
│ Caller (Oweru    │──▶│ Verification Gate      │──▶│ (:type path param)    │──▶│ toApiListing() /          │──▶│ { "properties":   │
│ OMS / partner)   │   │ constant-time compare  │   │ houses | lands |       │   │ mapPropertyRecord()       │   │   [ ... ] }       │
│                  │◀──│ 401 on any mismatch    │◀──│ commercial → Prisma    │◀──│ nests size/location/      │◀──│  JSON payload     │
│                  │   │ or missing env secret  │   │ delegate lookup        │   │ owner/broker/media        │   │                    │
└────────────────┘   └──────────────────────┘   └──────────────────────┘   └───────────────────────────┘   └──────────────────┘
```

1. **Verification Gate** — `ExternalAuthGuard` (`src/external/external-auth.guard.ts`) runs
   before the controller method is ever invoked (`@UseGuards(ExternalAuthGuard)` at the
   controller class level, so it applies uniformly to all four routes). Failure short-circuits
   the request with a `401`; the controller/service layer never runs.
2. **Route Discriminator** — `ExternalPropertiesController` binds `:type` as a plain string path
   param; `ExternalPropertiesService.resolveType()`/`delegateFor()` is the single place that maps
   it to a Prisma delegate (`houseForSale`, `landForSale`, `commercialArea`). An unrecognized
   `:type` throws `BadRequestException` here — before any query runs.
3. **Serialization Transformer** — for the two `GET` routes, `toApiListing()`
   (`external-properties.service.ts`) reshapes the raw Prisma row (with its relations already
   `include`d) into the partner's nested JSON contract. `PATCH`/`DELETE` do **not** run this
   transform — they return the raw Prisma row (see §4.3 and Appendix A on the "dual pipeline").
4. **Response Delivery** — every list-returning route wraps its array in a `{ "properties": [...] }`
   root object, per the partner's schema requirement.

### 2.3 Use-case / workflow matrix

| Use case | Trigger | Path | Guard rail |
|---|---|---|---|
| **Public listing submission** | Visitor completes the wizard | `POST /house-for-sale`, `/land-for-sale`, `/commercial-area` | Global `ValidationPipe`; nested `create` (broker/owner/features/images/documents/videos) in one Prisma call; `status` defaults to `PENDING` |
| **Admin review — edit** | Reviewer opens a listing in the dashboard | `GET /:kind/:id` (with relations), then `PATCH /:kind/:id` | Same DTOs as create, `PartialType`-derived |
| **Admin review — approve** | Reviewer sets status to `APPROVE` and saves | `PATCH /:kind/:id` with `{ status: "APPROVE" }` | Triggers `PropertyMirrorService.syncApproved()` — see §1.2 |
| **Admin review — delete** | Reviewer deletes a listing from the dashboard | `DELETE /:kind/:id` | Hard delete via `prisma.<model>.delete()` — this is the **internal** admin delete, separate from the external gateway's delete |
| **Partner — combined feed** | Partner polls for everything | `GET /external/properties` | `Promise.all` across all three tables, `status != DELETED`, bearer-gated |
| **Partner — one category** | Partner polls one listing type | `GET /external/properties/:type` | Same filter, single-table `include` set |
| **Partner — dynamic update** | Partner PATCHes a field set | `PATCH /external/properties/:type/:id` | Whitelisted `UpdateExternalListingDto` fields only (§5.2); `P2025` → `404` |
| **Partner — safe hard-delete** | Partner deletes a record | `DELETE /external/properties/:type/:id` | **Permanent** row removal (`prisma.<model>.delete()`), not a status flip; `P2025` → `404` |

---

## 3. Database Architecture & Schema Landscape

### 3.1 Primary tracking tables

Each listing category is its **own top-level table** — there is no single polymorphic `Listing`
table with a discriminator column. This is a deliberate schema choice: house/land/commercial
listings have genuinely different column sets (bedrooms vs. land type vs. rental term), and
Prisma's relation model handles three narrow tables more cleanly than one wide one with dozens of
nullable columns.

```
PropertyCategory ──┬──< HouseForSale
                    ├──< LandForSale
                    └──< CommercialArea

Region ──< District ──< Ward
   │            │           │
   └────────────┴───────────┴──< (each listing table has its own regionId/districtId/wardId FK)

Broker ──< (each listing table has its own brokerId FK)
Owner  ──< (each listing table has its own ownerId FK)
```

| Table | Purpose | Notable fields |
|---|---|---|
| `HouseForSale` | One row per house listing | `salePrice`, `sizeUnit`, `size`, `houseTypeId`, `bedrooms`, `bathrooms`, `status` (default `PENDING`) |
| `LandForSale` | One row per land listing | `salePrice`, `sizeUnit`, `size`, `landTypeId`, `status` |
| `CommercialArea` | One row per commercial listing | `listingType` (`SALE`/`RENT`), `salePrice`, `monthlyRent`, `rentalTerm`, `propertyTypeId`, `status` |
| `PropertyCategory` | Admin-managed category metadata | `title`, `slug`, `icon`, `accent` — **`slug` is free text the admin types in the Categories screen, not a fixed enum** |
| `Region` / `District` / `Ward` | Tanzania location hierarchy | `Ward.districtId → District.id`, `District.regionId → Region.id`, unique on `(name, parent)` |
| `Broker` / `Owner` | Shared contact directory | `name`, `phone`, `nid`, `tin`, `email` — reused across every listing they're attached to; **no region/district field of their own** |

Each listing table additionally has its own **feature / image / document / video** child tables
(e.g. `HouseForSaleFeature`, `HouseForSaleImage`, `HouseForSaleDocument`, `HouseForSaleVideo`,
mirrored for `LandForSale*` and `CommercialArea*`). All are `onDelete: Cascade` from the parent —
deleting a listing row deletes its features/media rows automatically; it does **not** delete the
physical files under `uploads/`.

### 3.2 The `Property` mirror table — internal staging zone

```prisma
model Property {
  id               String   @id @default(uuid())
  externalId       String   @unique   // = source listing's own id
  status           String             // "verified" once mirrored
  title            String
  category         String             // propertyCategory.slug, or a synthesized fallback
  price            Decimal
  ... (fully flattened: houseType, landType, commercialType, bedrooms, bathrooms,
       sizeValue/sizeUnit/sizeWidth/sizeLength, features Json, locationRegion/
       locationDistrict/locationWard/locationStreet/locationGpsLat/locationGpsLng,
       ownerFullName/ownerPhone/..., brokerFullName/brokerPhone/...,
       images Json, videos Json, listingKind, parentExternalId, unitLabel)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@map("Properties")
}
```

This table is **write-only from `PropertyMirrorService`** and **read-only from
`PropertiesService`** (`GET /properties`). Nothing else touches it. It exists so the platform's
own public read surface never has to join across three source tables and their relations on
every request — the mirror is the pre-joined, pre-flattened snapshot taken at approval time.

**Two NOT NULL columns worth knowing about:** `locationRegion` and `locationDistrict` are
non-nullable in the `Properties` table, but a source listing's region/district relation is
optional. `PropertyMirrorService` falls back to `''` (empty string) rather than `null` when
building the mirror row — this is a schema/data mismatch that was resolved with a safe fallback
rather than a migration, documented at the call site.

### 3.3 Relational constraint notes

- `HouseForSaleFeature.houseId`, `LandForSaleFeature.landId`, `CommercialAreaFeature.commercialId`
  — each feature is a bare `{ id, name }` row, **not** a shared lookup table. Two listings with a
  "Parking" feature each get their own `Feature` row with the string `"Parking"`. There is no
  feature dictionary/enum in the schema today (see Appendix A re: the `{key, label}` object
  format).
- Media tables (`*Image`, `*Document`, `*Video`) store a `url` (relative, e.g. `/uploads/<uuid>.jpg`),
  optional `fileType`/`sizeBytes`, and — for images — `isCover: Boolean @default(false)`.
  **The stored `url` is always relative.** Absolute-URL composition happens at the read edge:
  the frontend's `getUploadUrl()` (`frontend/src/services/api.ts`) prefixes with
  `VITE_API_URL`/`https://saleapi.oweru.com`; the external gateway prefixes with its own
  `MEDIA_BASE_URL` constant (`https://saleapi.oweru.com`, overridable via
  `PUBLIC_MEDIA_BASE_URL`). **These two prefixing points must be kept in sync** — a previous
  regression had the external gateway hardcoded to the wrong host (`oweru.com` instead of
  `saleapi.oweru.com`) precisely because this composition happens in two places, not one.
- `Region`/`District`/`Ward` are seeded from a bundled Tanzania dataset
  (`frontend/src/data/tanzaniaLocations.ts`) for offline-first dropdown rendering, and reconciled
  against live DB rows once the backend has locations seeded (`prisma/seed-locations.cjs`).

---

## 4. Implementation Matrix & Gateway Endpoints

### 4.1 Mount point and routing

`ExternalPropertiesController` is `@Controller('external/properties')`, registered through
`ExternalPropertiesModule` in `AppModule`. It is **intentionally not mounted at bare
`/properties`** — that path already serves the internal `Property` mirror feed (§3.2) in a
different, flattened response shape. Colliding the two was considered and rejected during
implementation specifically to avoid one route silently changing meaning for existing callers.

| Method | Path | Auth | Body |
|---|---|---|---|
| `GET` | `/external/properties` | Bearer | — |
| `GET` | `/external/properties/:type` | Bearer | — |
| `PATCH` | `/external/properties/:type/:id` | Bearer | `UpdateExternalListingDto` |
| `DELETE` | `/external/properties/:type/:id` | Bearer | — |

### 4.2 The `:type` discriminator

```ts
export type ListingType = 'houses' | 'lands' | 'commercial';

const DELEGATE_KEY: Record<ListingType, 'houseForSale' | 'landForSale' | 'commercialArea'> = {
  houses: 'houseForSale',
  lands: 'landForSale',
  commercial: 'commercialArea',
};
```

`resolveType()` is a closed match against exactly these three literals — there is no
case-insensitivity, no plural/singular normalization, no alias table. `"House"`, `"house"`, and
`"HOUSES"` all fall through to `BadRequestException('Unknown type "..."'`. This is intentional:
the discriminator is also the contract the partner integrates against, and a permissive matcher
would let a typo silently succeed against the wrong table in a future refactor.

Each type carries its **own `include` map** (`INCLUDE[kind]` / `includeFor()`), because the
three Prisma models relate to different type-lookup tables:

| Type | Type-lookup relation | Category-specific transform fields |
|---|---|---|
| `houses` | `houseType` | `houseType` (lowercased), `bedrooms`, `bathrooms` |
| `lands` | `landType` | `landType` (lowercased) |
| `commercial` | `propertyType` | `commercialType` (lowercased, from `propertyType.name`), `rentMonths` (parsed from `rentalTerm` when `listingType === 'RENT'`) |

### 4.3 The serialization pipeline — and where it is *not* dual

The brief describes a "Dual-Pipeline Data Serialization Engine" that splits payloads into
separate **brokerage** (houses/commercial) and **land** tracks. **That split does not exist in
the current implementation.** What exists is a single transform function
(`toApiListing()`/`mapPropertyRecord()`) applied identically across all three types, with three
small `if (kind === '...')` branches at the end that attach the one or two fields unique to that
type (`houseType`+`bedrooms`+`bathrooms`, or `landType`, or `commercialType`+`rentMonths`).
`owner` and `broker` are built the same way, from the same shape, for every type — there is no
type-conditional "brokerage track."

What the current pipeline *does* do, concretely, per row:

1. Resolves `category` from `propertyCategory.slug` (dashes → underscores, lowercased), falling
   back to a synthesized `house_sale` / `land_sale` / `commercial_sale` / `commercial_rent` when
   no category is linked.
2. Converts every Prisma `Decimal` field (`price`, `size`, `latitude`/`longitude` where numeric)
   to a plain JS `number` via a `toNumber()` helper — never leaves a `Decimal` object in the
   response, which would otherwise serialize inconsistently.
3. Nests `size` → `{ value, unit }`, `location` → `{ region, district, ward, street, gpsLat, gpsLng }`,
   `owner` → `{ fullName, phone, altPhone, email, nationalId, tin }`, `broker` → the same shape
   plus `operatingRegion`/`operatingDistrict` (sourced from the *listing's* region/district, since
   `Broker` carries no region of its own — see §3.1).
4. Maps `features` (`[{ name: 'Parking' }]`) to a flat, lowercased string array
   (`["parking"]`) — **not** to `{ key, label }` objects. See Appendix A.
5. Prefixes every `images[]`/`videos[]` entry with `MEDIA_BASE_URL` (§3.3).
6. **Does not strip `owner`/`broker`** — both are fully populated in the response today, by
   explicit prior instruction ("map ALL fields, do not hide anything"). See Appendix A.

`PATCH` and `DELETE` do not run this transform at all — they return whatever Prisma's
`update()`/`delete()` resolves with (the raw row, relations not included), since the partner's
contract for those two operations is "confirm what changed," not "give me the full nested
listing again."

---

## 5. Security Framework & Integrity Controls

### 5.1 `ExternalAuthGuard` — fail-closed bearer verification

`src/external/external-auth.guard.ts`, applied at the controller level so it runs ahead of every
handler in `ExternalPropertiesController`:

```ts
canActivate(context: ExecutionContext): boolean {
  const request = context.switchToHttp().getRequest<Request>();
  const expected = process.env.EXTERNAL_SYSTEM_KEY;

  if (!expected) {
    this.logger.error('EXTERNAL_SYSTEM_KEY is not set — refusing all external requests.');
    throw new UnauthorizedException('External access is not configured.');
  }

  const token = extractBearerToken(request.headers['authorization']);
  if (!token || !safeEquals(token, expected)) {
    throw new UnauthorizedException('Invalid or missing bearer token.');
  }
  return true;
}
```

**Fallback structure when the env key is missing:** the guard does **not** treat an unset
`EXTERNAL_SYSTEM_KEY` as "no restriction configured, allow through." It treats it as a
misconfiguration and throws the exact same `401 Unauthorized` a bad token would produce, with a
distinct server-side log line (`EXTERNAL_SYSTEM_KEY is not set — refusing all external requests.`)
so an operator can tell the two failure modes apart from the logs without the client-visible
response ever leaking which one occurred.

**Timing-safe comparison:**

```ts
function safeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
```

`crypto.timingSafeEqual()` only accepts equal-length buffers — comparing unequal lengths throws,
so the length check happens first and short-circuits with a plain `false`. This means the
length-mismatch branch is **not** itself constant-time relative to the length-match branch, but
token *length* is not the secret being protected — the token's *content* is, and every
content comparison that reaches `timingSafeEqual()` is genuinely constant-time regardless of
where the first differing byte falls. This is the standard, correct scope for this mitigation:
it defeats a byte-by-byte content-guessing attack, which is the realistic threat against a bearer
token compare.

### 5.2 Global `ValidationPipe` vs. loose PATCH payloads

`main.ts`: `app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))`. With
`whitelist: true`, class-validator strips any property from an incoming body **that has no
validation decorator on the target DTO class** — this applies before the request even reaches the
controller method, regardless of what the controller does afterward.

This bit the external gateway once already: an earlier version of `UpdateExternalListingDto` had
plain, undecorated TypeScript properties (`title?: string`, etc., with a `[key: string]: unknown`
index signature for documentation purposes). TypeScript's index signature has **zero runtime
effect** on class-transformer/class-validator — the global pipe still stripped the body down to
`{}` before it reached Prisma, so `PATCH` requests returned `200 OK` while silently changing
nothing. The fix was **not** a per-route pipe override (a param-scoped `ValidationPipe` still runs
*after* the global one in the pipe chain, receiving the already-stripped value — that override was
dead code). The fix was decorating every field the DTO is meant to carry:

```ts
export class UpdateExternalListingDto {
  @IsOptional() @IsString()  title?: string;
  @IsOptional() @IsString()  status?: string;
  @IsOptional() @IsNumber()  salePrice?: number;
  @IsOptional() @IsNumber()  monthlyRent?: number;
  @IsOptional() @IsString()  rentalTerm?: string;
  @IsOptional() @IsNumber()  size?: number;
  @IsOptional() @IsString()  sizeUnit?: string;
  @IsOptional() @IsString()  description?: string;
}
```

**Operational consequence, worth repeating to every engineer who touches this DTO:** any field
not decorated here is silently dropped from every `PATCH /external/properties/:type/:id` request,
with **no error, no warning, a `200 OK` response** — the exact failure mode above. Adding partner
support for a new field (e.g. `bedrooms`, `latitude`) requires adding a decorated property to this
DTO; there is no other switch to flip.

A field the DTO *does* whitelist but the target Prisma model doesn't have (e.g. `monthlyRent`
against `HouseForSale`) reaches Prisma successfully and is rejected there with a runtime error,
which the service layer catches and reports as `400 Bad Request` — a legibly different failure
mode from the silent-drop one above.

---

## 6. Deployment Pipeline, PM2 Runtime Orchestration & Monitoring

> This section documents standard operating procedure for this stack combination (aaPanel + PM2
> + Linux, with local development against XAMPP's MySQL). None of these files ship inside this
> repository — `ecosystem.config.js`, aaPanel site configuration, and PM2 process names are
> environment-specific and owned by whoever provisions the box. Treat file paths below as the
> conventional aaPanel/PM2 layout, and confirm against the actual server before relying on them.

### 6.1 Local development — XAMPP

- Local `backend/.env` points `DATABASE_HOST=127.0.0.1`, `DATABASE_PORT=3306` at XAMPP's MySQL
  (or MariaDB) service, with `DATABASE_URL` kept in sync with the discrete host/port/user/password
  vars — `PrismaService` reads the discrete vars for the adapter constructor, so **both must be
  updated together** when rotating a local password; only the discrete vars are actually consumed
  at runtime (`DATABASE_URL` is present for tooling — e.g. `prisma migrate` — that expects it).
- Run: `npm install && npx prisma generate && npm run start:dev` (from `backend/`). `start:dev`
  runs `nest start --watch`.
- Common local failure: **port 3306 already bound** — either a system MySQL service is also
  running, or a previous XAMPP session didn't release the port. Check with:
  `sudo lsof -i :3306` or `sudo netstat -tulpn | grep 3306` (see §6.4 on missing `net-tools`).

### 6.2 Production — aaPanel + PM2

Typical aaPanel layout for a Node site:

```
/www/wwwroot/<site>/               # deployed backend checkout
  ├── dist/main.js                 # `npm run build` output — this is what PM2 runs
  ├── .env                         # production secrets — set outside git, via aaPanel's file manager
  ├── uploads/                     # persisted media — back this up independently of the DB
  └── node_modules/
```

Standard deploy sequence:

```bash
cd /www/wwwroot/<site>
git pull                     # or aaPanel's own deployment hook
npm install --omit=dev
npx prisma generate
npx prisma migrate deploy    # NOT `migrate dev` in production — no interactive prompts, no shadow DB
npm run build
pm2 restart <process-name> --update-env
```

**`--update-env` is not optional after touching `.env`.** PM2 caches the environment a process
was originally started with; a plain `pm2 restart` re-execs the process but keeps the *old*
environment snapshot, so a rotated `EXTERNAL_SYSTEM_KEY` or a changed `DATABASE_PASSWORD` will
silently keep applying the previous value until either `--update-env` is used or the process is
fully `pm2 delete`'d and re-`pm2 start`'d. This is the single most common cause of "I updated the
`.env` and nothing changed" reports against this system.

```bash
pm2 restart all --update-env      # flushes cached env for every managed process
pm2 restart <process-name> --update-env   # scoped to one process — prefer this in a multi-app box
pm2 logs <process-name> --lines 200       # tail recent output
pm2 describe <process-name>               # confirm the env it actually launched with
```

aaPanel's Node.js Project Manager panel wraps `pm2` for point-and-click start/stop/restart and
log viewing — the underlying commands above are what it executes, and dropping to the shell for
`--update-env` specifically is often faster than the panel UI for that one flag.

### 6.3 Monitoring playbook — connection drops

1. **`ECONNREFUSED` / `P1001` (Prisma "Can't reach database server")** — confirm MySQL is up
   (`systemctl status mysql` / aaPanel's Database panel), confirm `DATABASE_HOST`/`DATABASE_PORT`
   in the *running* process's environment match reality (`pm2 describe <process-name>` — see
   §6.2 on stale cached env), confirm the DB user's host grants allow the app server's IP if the
   two are on different machines.
2. **`P2025` — "An operation failed because it depends on one or more records that were
   required but not found"** — this is Prisma's not-found code, surfaced deliberately by this
   codebase's `isRecordNotFound()` helper (present in every listing service, the mirror service,
   and the external gateway service) and converted to a `404 NotFoundException` rather than a raw
   `500`. If a `P2025` reaches the logs as an *unhandled* rejection instead of a clean 404, the
   catch block around that specific Prisma call is missing — check that the new/changed code path
   follows the existing `try { ... } catch (error) { if (isRecordNotFound(error)) throw new
   NotFoundException(...); throw new BadRequestException(...); }` pattern before shipping it.
3. **Local XAMPP port locks** — see §6.1. In production this manifests as PM2 restart-looping a
   process that can't bind or connect; `pm2 logs` will show the same connection error repeating
   on a fixed interval matching PM2's restart backoff.
4. **Missing `net-tools` (`netstat: command not found`)** — common on minimal Linux images;
   aaPanel-provisioned boxes usually include it, but a hardened/stripped image may not.
   `sudo apt install net-tools` (Debian/Ubuntu) or `sudo yum install net-tools` (CentOS/RHEL)
   restores `netstat`; `ss -tulpn` is the modern equivalent and ships by default on most distros
   if `net-tools` is unavailable.
5. **Runtime thread/memory limits** — PM2 processes should run with an explicit memory ceiling
   (`pm2 start dist/main.js --name <process-name> --max-memory-restart 512M`, or the equivalent
   `max_memory_restart` key in `ecosystem.config.js`) so a leak restarts the process instead of
   taking down the host. `pm2 monit` gives a live per-process CPU/memory view; `pm2 describe
   <process-name>` reports restart count and the reason for the last restart (`exited`,
   `error`, or the memory ceiling itself).

---

## Appendix A — Spec Deltas (what this manual would not let pass silently)

The original brief for this manual described three behaviors that **do not exist in the current
codebase**. They're listed here, together, so they can be triaged as a follow-up feature request
rather than discovered later as a documentation lie:

1. **Feature objects.** Brief: `{ "key": "road_access", "label": "Road Access" }`.
   Actual: `features` is a flat array of lowercased strings, e.g. `["road_access"]` is *not*
   produced either — the current transform lowercases and trims the raw `name` verbatim
   (`"Road Access"` → `"road access"`, not `"road_access"`), with no separate `key`/`label` split
   and no underscore-casing step. Implementing the brief's format is a small, contained change to
   `toApiListing()`'s features mapper — flagging it here rather than doing it silently, since it
   changes the external contract's shape.
2. **"Dual-pipeline brokerage/land track split."** Actual: one transform function runs for all
   three types; `owner`/`broker` are built identically regardless of type. There is no
   type-conditional branch that treats houses/commercial differently from land for owner/broker
   purposes.
3. **"Stripping private owner/broker profiles out of client feeds."** Actual: `owner` and
   `broker` are fully populated in every `GET` response from the external gateway today — by
   explicit prior instruction to include every field ("map ALL fields, do not hide anything").
   If the intent has changed and partner responses should now omit or redact PII (phone, email,
   NIDA, TIN), that's a real, separate change to make deliberately — not something to infer from
   a documentation pass.

None of the three are implemented as part of producing this manual. Say which (if any) you want
built, and they can be added as a scoped, testable change with their own changelog entry — same
as the mirror-boundary and PATCH-whitelist fixes documented in §1.2 and §5.2 were.
