/**
 * Documentation-only shape for the external PATCH body.
 *
 * `houses`, `lands`, and `commercial` each map to a different Prisma model
 * with a different column set, so there is no single strict DTO that fits
 * all three — the controller accepts a loose object (see
 * ExternalPropertiesController#update) and forwards it to Prisma as-is.
 * This class exists so Swagger/consumers have a readable reference of the
 * fields every listing type has in common.
 */
export class UpdateExternalListingDto {
  title?: string;
  salePrice?: number;
  status?: string;
  description?: string;
  sizeUnit?: string;
  size?: number;
  exactLocation?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}
