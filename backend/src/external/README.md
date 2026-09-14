# External B2B Properties Gateway

Read/update/soft-delete access to `HouseForSale`, `LandForSale`, and
`CommercialArea` for partner systems, without handing out database
credentials. Every route sits behind `ExternalAuthGuard` and requires a
static bearer token.

Base path (mounted in this repo): `/external/properties`
Public base URL for partner integration: `https://saleapi.oweru.com`

## 1. Environment variable

Add a long, random secret to `backend/.env` (never commit the real value):

```bash
# generate one:
openssl rand -hex 32
```

```dotenv
EXTERNAL_SYSTEM_KEY="<paste the generated value here>"
```

`ExternalAuthGuard` reads `process.env.EXTERNAL_SYSTEM_KEY` on every request
and fails closed (401) if the variable is unset — it will never silently
allow unauthenticated access because the env var is missing. Restart the
Nest server after setting it.

Hand the partner developer the token value out-of-band (not over
email/Slack in plaintext, if you can help it) and have them send it as:

```
Authorization: Bearer <token>
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

`:id` is the record's UUID primary key. An unknown `:type` returns `400`; an
unknown `:id` returns `404`; a missing/invalid bearer token returns `401`.

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
      summary: Get combined listing feed
      description: >
        Returns every active (non-DELETED) listing across houses, lands,
        and commercial areas in a single array.
      operationId: getCombinedProperties
      tags: [Properties]
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
      summary: Get category list
      description: Returns active listings for a single category.
      operationId: getPropertiesByType
      tags: [Properties]
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
      operationId: updateProperty
      tags: [Properties]
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
      description: Sets `status` to `DELETED`. The row itself is preserved.
      operationId: softDeleteProperty
      tags: [Properties]
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
        statusCode:
          type: integer
        message:
          oneOf:
            - type: string
            - type: array
              items:
                type: string
        error:
          type: string

  responses:
    BadRequest:
      description: Invalid `:type` segment, or the request body/record failed to process.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            statusCode: 400
            message: 'Unknown type "vehicles". Use one of: houses, lands, commercial.'
            error: Bad Request
    Unauthorized:
      description: Missing or invalid bearer token.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            statusCode: 401
            message: Invalid or missing bearer token.
            error: Unauthorized
    NotFound:
      description: No record exists for the given `:type` and `:id`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            statusCode: 404
            message: 'No "houses" record found for id "..."'
            error: Not Found
```
