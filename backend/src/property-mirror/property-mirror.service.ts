import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.config/prisma.service';

export type ListingKindKey = 'house-for-sale' | 'land-for-sale' | 'commercial-area';

const SIZE_UNITS = ['sqm', 'acre', 'plot', 'metre', 'feet'] as const;

const RENTAL_TERM_MONTHS: Record<string, number> = {
  MONTHLY: 1,
  '3_MONTHS': 3,
  '4_MONTHS': 4,
  '6_MONTHS': 6,
  YEARLY: 12,
};

/**
 * Read-side mirror of approved listings into the flat `Property` ("Properties") table.
 *
 * This never mutates or wraps the existing update flow — the feature services call
 * `syncApproved()` *after* their own `prisma.*.update()` has already resolved, and the
 * method is a guarded no-op unless the incoming status is exactly "APPROVED".
 * It also swallows its own errors so a mirror failure can never break "Save Changes".
 */
@Injectable()
export class PropertyMirrorService {
  private readonly logger = new Logger(PropertyMirrorService.name);

  constructor(private readonly prisma: PrismaService) {}

  async syncApproved(
    kind: ListingKindKey,
    id: string,
    incomingStatus?: string | null,
  ): Promise<void> {
    if ((incomingStatus ?? '').toUpperCase() !== 'APPROVED') return;

    try {
      const data =
        kind === 'house-for-sale'
          ? await this.fromHouse(id)
          : kind === 'land-for-sale'
            ? await this.fromLand(id)
            : kind === 'commercial-area'
              ? await this.fromCommercial(id)
              : null;

      if (!data) return;

      await this.prisma.property.upsert({
        where: { externalId: data.externalId },
        create: data,
        update: data,
      });

      this.logger.log(`Mirrored ${kind} ${id} → Properties (externalId=${data.externalId})`);
    } catch (err) {
      this.logger.error(
        `Property mirror failed for ${kind} ${id}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // shared field transforms
  // ---------------------------------------------------------------------------

  /** `[{ name: 'Parking' }, ...] -> ['Parking', ...]` (JSON null when empty). */
  private featureNames(rel?: { name: string }[] | null): Prisma.InputJsonValue | typeof Prisma.JsonNull {
    const list = (rel ?? []).map((r) => r.name).filter(Boolean);
    return list.length ? list : Prisma.JsonNull;
  }

  /** `[{ url: '...' }, ...] -> ['...', ...]` (JSON null when empty). */
  private mediaUrls(rel?: { url: string }[] | null): Prisma.InputJsonValue | typeof Prisma.JsonNull {
    const list = (rel ?? []).map((r) => r.url).filter(Boolean);
    return list.length ? list : Prisma.JsonNull;
  }

  /** Only pass a value the `SizeUnit` enum actually accepts, otherwise null. */
  private sizeUnit(value?: string | null): Prisma.PropertyUncheckedCreateInput['sizeUnit'] {
    return value && (SIZE_UNITS as readonly string[]).includes(value)
      ? (value as Prisma.PropertyUncheckedCreateInput['sizeUnit'])
      : null;
  }

  /**
   * Fields common to all three source models. Anything the source does not carry
   * is set explicitly to `null` (or a safe fallback for NOT NULL columns).
   */
  private common(row: any) {
    return {
      externalId: row.id as string, // master id == unique syncing token
      status: 'verified',
      verifiedAt: new Date(),
      verifiedBy: null,
      sourceUrl: null,

      title: row.title as string,
      description: row.description ?? null,

      rentMonths: null,
      ensuiteCount: null,

      sizeValue: row.size ?? null,
      sizeUnit: this.sizeUnit(row.sizeUnit),
      sizeWidth: null,
      sizeLength: null,

      features: this.featureNames(row.features),
      featuresOther: null,

      // locationRegion / locationDistrict are NOT NULL in the DB — fall back to ''.
      locationRegion: row.region?.name ?? '',
      locationDistrict: row.district?.name ?? '',
      locationWard: row.ward?.name ?? null,
      locationStreet: row.exactLocation ?? null,
      locationGpsLat: row.latitude ?? null,
      locationGpsLng: row.longitude ?? null,

      ownerFullName: row.owner?.name ?? null,
      ownerPhone: row.owner?.phone ?? null,
      ownerAltPhone: null,
      ownerEmail: row.owner?.email ?? null,
      ownerNationalId: row.owner?.nid ?? null,

      brokerFullName: row.broker?.name ?? null,
      brokerPhone: row.broker?.phone ?? null,
      brokerAltPhone: null,
      brokerEmail: row.broker?.email ?? null,
      brokerNatReg: null,
      brokerNatDist: null,

      images: this.mediaUrls(row.images),
      videos: this.mediaUrls(row.videos),

      listingKind: 'single' as const,
      parentExternalId: null,
      unitLabel: null,
    };
  }

  // ---------------------------------------------------------------------------
  // per-model mappers
  // ---------------------------------------------------------------------------

  private async fromHouse(id: string): Promise<Prisma.PropertyUncheckedCreateInput | null> {
    const row = await this.prisma.houseForSale.findUnique({
      where: { id },
      include: {
        houseType: true,
        propertyCategory: true,
        broker: true,
        owner: true,
        region: true,
        district: true,
        ward: true,
        features: true,
        images: true,
        videos: true,
      },
    });
    if (!row) return null;

    return {
      ...this.common(row),
      category: row.propertyCategory?.slug ?? 'house-for-sale',
      price: row.salePrice,
      houseType: row.houseType?.name ?? null,
      commercialType: null,
      landType: null,
      bedrooms: row.bedrooms ?? null,
      bathrooms: row.bathrooms ?? null,
    };
  }

  private async fromLand(id: string): Promise<Prisma.PropertyUncheckedCreateInput | null> {
    const row = await this.prisma.landForSale.findUnique({
      where: { id },
      include: {
        landType: true,
        propertyCategory: true,
        broker: true,
        owner: true,
        region: true,
        district: true,
        ward: true,
        features: true,
        images: true,
        videos: true,
      },
    });
    if (!row) return null;

    return {
      ...this.common(row),
      category: row.propertyCategory?.slug ?? 'land-for-sale',
      price: row.salePrice,
      houseType: null,
      commercialType: null,
      landType: row.landType?.name ?? null,
      bedrooms: null,
      bathrooms: null,
    };
  }

  private async fromCommercial(id: string): Promise<Prisma.PropertyUncheckedCreateInput | null> {
    const row = await this.prisma.commercialArea.findUnique({
      where: { id },
      include: {
        propertyType: true,
        propertyCategory: true,
        broker: true,
        owner: true,
        region: true,
        district: true,
        ward: true,
        features: true,
        images: true,
        videos: true,
      },
    });
    if (!row) return null;

    return {
      ...this.common(row),
      category: row.propertyCategory?.slug ?? 'commercial-area',
      // price is NOT NULL: sale price, else monthly rent, else 0.
      price: row.salePrice ?? row.monthlyRent ?? new Prisma.Decimal(0),
      houseType: null,
      commercialType: row.propertyType?.name ?? null,
      landType: null,
      bedrooms: null,
      bathrooms: null,
      rentMonths: row.rentalTerm ? (RENTAL_TERM_MONTHS[row.rentalTerm] ?? null) : null,
    };
  }
}
