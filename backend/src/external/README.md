# External B2B Properties Gateway

Read/update/soft-delete access to `HouseForSale`, `LandForSale`, and
`CommercialArea` for partner systems, without handing out database
credentials. Every route sits behind `ExternalAuthGuard` and requires a
static bearer token.

- **Base path in this repo:** `/external/properties`
- **Public base URL:** `https://saleapi.oweru.com`
- **Full URL example:** `https://saleapi.oweru.com/external/properties`

## 1. Authentication — required header

Every request, on every endpoint below, must carry:

| Header | Value | Required |
|---|---|---|
| `Authorization` | `Bearer <EXTERNAL_SYSTEM_KEY>` | ✅ always |
| `Content-Type` | `application/json` | ✅ on `PATCH` (request has a body) |

There is no API key query param and no cookie — the bearer token is the
only credential. Requests with no header, an empty header, a non-`Bearer`
scheme, or a token that doesn't match the server's `EXTERNAL_SYSTEM_KEY`
all get the same response:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Invalid or missing bearer token.",
  "error": "Unauthorized",
  "statusCode": 401
}
```

`ExternalAuthGuard` (`src/external/external-auth.guard.ts`) reads
`process.env.EXTERNAL_SYSTEM_KEY` on every request and fails closed with
that same 401 if the variable is unset server-side — a missing/misconfigured
secret can never be mistaken for "allow all". Compare is constant-time
(`crypto.timingSafeEqual`).

### Setting the secret

```bash
# generate one:
openssl rand -hex 32
```

```dotenv
# backend/.env
EXTERNAL_SYSTEM_KEY="<paste the generated value here>"
```

Restart the Nest server after setting it. Hand the partner developer the
token value out-of-band (not over email/Slack in plaintext, if you can help
it) — never a database credential, only this one shared secret.

### curl examples

```bash
# A. Combined feed
curl -X GET 'https://saleapi.oweru.com/external/properties' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'

# B. One category
curl -X GET 'https://saleapi.oweru.com/external/properties/houses' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'

# C. Update a record
curl -X PATCH 'https://saleapi.oweru.com/external/properties/houses/<id>' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{ "status": "ACTIVE", "salePrice": 950000 }'

# D. Soft-delete a record
curl -X DELETE 'https://saleapi.oweru.com/external/properties/houses/<id>' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>'
```

## 2. File structure

```
src/external/
├── external-auth.guard.ts          # Bearer-token guard (constant-time compare)
├── external-properties.controller.ts
├── external-properties.service.ts  # Promise.all combined feed + per-type CRUD
├── external-properties.module.ts
├── dto/
│   └── update-external-listing.dto.ts
└── README.md                       # this file
```

## 3. Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/external/properties` | Combined feed: all active (non-`DELETED`) rows from Houses + Lands + Commercial. |
| GET | `/external/properties/:type` | One type's active rows. `:type` ∈ `houses`, `lands`, `commercial`. |
| PATCH | `/external/properties/:type/:id` | Update one record by id. |
| DELETE | `/external/properties/:type/:id` | Soft-delete: sets `status = "DELETED"`. Row is kept for audit. |

`:id` is the record's UUID primary key.

| Status | When |
|---|---|
| `200` | Request succeeded. |
| `400` | `:type` isn't `houses`/`lands`/`commercial`, or the request/record couldn't be processed. |
| `401` | Missing/invalid `Authorization` header. |
| `404` | `:type` is valid but no record matches `:id`. |

> **Note:** this repo already exposes `GET /properties` (see
> `src/properties/`), which returns the internal `Property` mirror table in
> a different, flattened shape. This gateway is intentionally mounted at a
> different path (`/external/properties`) so it doesn't collide with that
> endpoint. Rename either one if you'd rather they share a path.

## 4. OpenAPI 3.0 specification

```yaml
openapi: 3.0.3
info:
  title: Oweru External Properties Gateway
  description: >
    B2B integration API exposing read/update/soft-delete access to house,
    land, and commercial listings without exposing database credentials.
    Every operation requires the bearerAuth scheme described below —
    Authorization: Bearer <token> — where <token> matches the server's
    EXTERNAL_SYSTEM_KEY.
  version: 1.0.0
  contact:
    name: Oweru Platform Team
servers:
  - url: https://saleapi.oweru.com
    description: Production

security:
  - bearerAuth: []

paths:
  /external/properties:
    get:
      summary: Retrieve all property listings across all categories
      description: >
        Returns the absolute master list of all properties (Houses, Lands,
        and Commercial Areas combined) that have not been soft-deleted.
        Built with Promise.all against all three source tables and merged
        into one array.
      operationId: getCombinedProperties
      tags: [Properties]
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Combined listing feed
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Listing'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '400':
          $ref: '#/components/responses/BadRequest'

  /external/properties/{type}:
    get:
      summary: Retrieve listings for a single category
      description: >
        Returns active (non-DELETED) listings for exactly one category,
        selected by the `type` path parameter.
      operationId: getPropertiesByType
      tags: [Properties]
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/TypeParam'
      responses:
        '200':
          description: Listings for the requested category
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Listing'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /external/properties/{type}/{id}:
    patch:
      summary: Update a listing
      description: >
        Partially updates one record in the table selected by `type`,
        matching the given `id`. Only the fields present in the body are
        changed.
      operationId: updateProperty
      tags: [Properties]
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/TypeParam'
        - $ref: '#/components/parameters/IdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateListingInput'
      responses:
        '200':
          description: The updated record
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Listing'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

    delete:
      summary: Soft-delete a listing
      description: >
        Sets `status` to `DELETED` instead of removing the row — the
        record is preserved for audit trails and excluded from every
        active GET feed above.
      operationId: softDeleteProperty
      tags: [Properties]
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/TypeParam'
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: The record after soft-delete
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Listing'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: >
        Send `Authorization: Bearer <token>` on every request, where
        <token> is the shared EXTERNAL_SYSTEM_KEY value issued to your
        integration. There is no other auth mechanism (no API key query
        param, no cookie).

  parameters:
    TypeParam:
      name: type
      in: path
      required: true
      description: Listing category discriminator.
      schema:
        type: string
        enum: [houses, lands, commercial]
    IdParam:
      name: id
      in: path
      required: true
      description: Record UUID.
      schema:
        type: string
        format: uuid

  schemas:
    Listing:
      type: object
      properties:
        id:
          type: string
          format: uuid
        type:
          type: string
          enum: [houses, lands, commercial]
        title:
          type: string
        salePrice:
          type: number
        status:
          type: string
          example: ACTIVE
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
      additionalProperties: true

    UpdateListingInput:
      type: object
      description: >
        Partial update. Accepted fields depend on the listing's category
        (house/land/commercial each have their own column set).
      properties:
        title:
          type: string
        salePrice:
          type: number
        status:
          type: string
        description:
          type: string
        sizeUnit:
          type: string
        size:
          type: number
        exactLocation:
          type: string
        latitude:
          type: number
        longitude:
          type: number
      additionalProperties: true

    ErrorResponse:
      type: object
      properties:
        message:
          oneOf:
            - type: string
            - type: array
              items:
                type: string
        error:
          type: string
        statusCode:
          type: integer

  responses:
    BadRequest:
      description: Invalid `:type` segment, or the request body/record failed to process.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            message: 'Unknown type "vehicles". Use one of: houses, lands, commercial.'
            error: Bad Request
            statusCode: 400
    Unauthorized:
      description: Missing or invalid bearer token.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            message: Invalid or missing bearer token.
            error: Unauthorized
            statusCode: 401
    NotFound:
      description: No record exists for the given `:type` and `:id`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            message: 'No "houses" record found for id "..."'
            error: Not Found
            statusCode: 404
```
