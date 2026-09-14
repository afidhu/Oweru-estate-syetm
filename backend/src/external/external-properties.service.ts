import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.config/prisma.service';
import { UpdateExternalListingDto } from './dto/update-external-listing.dto';

export type ListingType = 'houses' | 'lands' | 'commercial';

const DELEGATE_KEY: Record<ListingType, 'houseForSale' | 'landForSale' | 'commercialArea'> = {
  houses: 'houseForSale',
  lands: 'landForSale',
  commercial: 'commercialArea',
};

const NOT_DELETED = { status: { not: 'DELETED' } };

interface ListingDelegate {
  findMany(args: { where: typeof NOT_DELETED; include?: Record<string, unknown> }): Promise<unknown[]>;
  update(args: { where: { id: string }; data: Record<string, unknown> }): Promise<unknown>;
  delete(args: { where: { id: string } }): Promise<unknown>;
}

@Injectable()
export class ExternalPropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  /** A. Combined feed across all three tables, DELETED rows excluded. */
  async findAllCombined() {
    try {
      const [houses, lands, commercial] = await Promise.all([
        this.prisma.houseForSale.findMany({
          where: NOT_DELETED,
          include: {
            propertyCategory: true,
            houseType: true,
            broker: true,
            owner: true,
            region: true,
            district: true,
            ward: true,
            features: true,
            images: true,
            videos: true,
          },
        }),
        this.prisma.landForSale.findMany({
          where: NOT_DELETED,
          include: {
            propertyCategory: true,
            landType: true,
            broker: true,
            owner: true,
            region: true,
            district: true,
            ward: true,
            features: true,
            images: true,
            videos: true,
          },
        }),
        this.prisma.commercialArea.findMany({
          where: NOT_DELETED,
          include: {
            propertyCategory: true,
            propertyType: true,
            broker: true,
            owner: true,
            region: true,
            district: true,
            ward: true,
            features: true,
            images: true,
            videos: true,
          },
        }),
      ]);

      return {
        properties: [
          ...houses.map((row) => this.mapPropertyRecord(row as Record<string, any>, 'houses')),
          ...lands.map((row) => this.mapPropertyRecord(row as Record<string, any>, 'lands')),
          ...commercial.map((row) => this.mapPropertyRecord(row as Record<string, any>, 'commercial')),
        ],
      };
    } catch (error) {
      throw new BadRequestException('Unable to load the combined listing feed.');
    }
  }

  /** B. One table's active rows, selected by the :type discriminator. */
  async findByType(type: string) {
    const model = this.delegateFor(type) as ListingDelegate;
    try {
      const include = this.includeFor(type as ListingType);
      const rows = await model.findMany({ where: NOT_DELETED, include });
      return {
        properties: rows.map((row) => this.mapPropertyRecord(row as Record<string, any>, type as ListingType)),
      };
    } catch (error) {
      throw new BadRequestException(`Unable to load "${type}" listings.`);
    }
  }

  private includeFor(type: ListingType): Record<string, unknown> {
    switch (type) {
      case 'houses':
        return {
          propertyCategory: true,
          houseType: true,
          broker: true,
          owner: true,
          region: true,
          district: true,
          ward: true,
          features: true,
          images: true,
          videos: true,
        };
      case 'lands':
        return {
          propertyCategory: true,
          landType: true,
          broker: true,
          owner: true,
          region: true,
          district: true,
          ward: true,
          features: true,
          images: true,
          videos: true,
        };
      case 'commercial':
        return {
          propertyCategory: true,
          propertyType: true,
          broker: true,
          owner: true,
          region: true,
          district: true,
          ward: true,
          features: true,
          images: true,
          videos: true,
        };
      default:
        return {};
    }
  }

  private mapPropertyRecord(row: Record<string, any>, type: ListingType) {
    const regionName = row.region?.name ?? null;
    const districtName = row.district?.name ?? null;
    const wardName = row.ward?.name ?? null;
    const category = this.normalizeCategory(
      row.propertyCategory?.slug ??
        (type === 'houses'
          ? 'house-sale'
          : type === 'lands'
            ? 'land-sale'
            : row.listingType === 'RENT'
              ? 'commercial-rent'
              : 'commercial-sale'),
      type,
      row.listingType,
    );

    const basePayload: Record<string, any> = {
      externalId: String(row.id),
      status: 'verified',
      category,
      title: row.title ?? null,
      price: this.toNumber(type === 'commercial' && row.listingType === 'RENT' ? row.monthlyRent : row.salePrice ?? row.monthlyRent),
      description: row.description ?? null,
      bedrooms: row.bedrooms ?? null,
      bathrooms: row.bathrooms ?? null,
      size: {
        value: this.toNumber(row.size),
        unit: row.sizeUnit ?? null,
      },
      features: (row.features ?? [])
        .map((feature: Record<string, any>) => String(feature?.name ?? '').trim().toLowerCase())
        .filter(Boolean),
      location: {
        region: regionName,
        district: districtName,
        ward: wardName,
        street: row.exactLocation ?? null,
        gpsLat: row.latitude ?? null,
        gpsLng: row.longitude ?? null,
      },
      owner: {
        fullName: row.owner?.name ?? null,
        phone: row.owner?.phone ?? null,
        altPhone: null,
        email: row.owner?.email ?? null,
        nationalId: row.owner?.nid ?? null,
        tin: row.owner?.tin ?? null,
      },
      broker: {
        fullName: row.broker?.name ?? null,
        phone: row.broker?.phone ?? null,
        altPhone: null,
        email: row.broker?.email ?? null,
        nationalId: row.broker?.nid ?? null,
        tin: row.broker?.tin ?? null,
        operatingRegion: regionName,
        operatingDistrict: districtName,
      },
      images: (row.images ?? []).map((image: Record<string, any>) => `https://oweru.com${image.url}`),
      videos: (row.videos ?? []).map((video: Record<string, any>) => `https://oweru.com${video.url}`),
    };

    if (type === 'houses') {
      const houseType = String(row.houseType?.name ?? '').trim().toLowerCase();
      if (houseType) {
        basePayload.houseType = houseType;
      }
      basePayload.rentMonths = null;
      return basePayload;
    }

    if (type === 'lands') {
      const landType = String(row.landType?.name ?? '').trim().toLowerCase();
      if (landType) {
        basePayload.landType = landType;
      }
      basePayload.rentMonths = null;
      return basePayload;
    }

    const commercialType = String(row.propertyType?.name ?? '').trim().toLowerCase();
    if (commercialType) {
      basePayload.commercialType = commercialType;
    }
    basePayload.rentMonths = row.listingType === 'RENT' ? this.parseRentalMonths(row.rentalTerm) : null;
    return basePayload;
  }

  private normalizeCategory(slug: string, type: ListingType, listingType?: string): string {
    const normalized = String(slug)
      .trim()
      .toLowerCase()
      .replace(/-/g, '_')
      .replace(/_for_/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

    if (normalized) {
      return normalized;
    }

    if (type === 'houses') {
      return 'house_sale';
    }

    if (type === 'lands') {
      return 'land_sale';
    }

    return listingType === 'RENT' ? 'commercial_rent' : 'commercial_sale';
  }

  private parseRentalMonths(value: string | null | undefined): number | null {
    if (!value) {
      return null;
    }

    const text = String(value).trim().toUpperCase();
    const direct = Number(text.match(/(\d+)/)?.[1] ?? 'NaN');
    if (Number.isFinite(direct)) {
      return direct;
    }

    if (text === 'MONTHLY') {
      return 1;
    }

    if (text === 'YEARLY') {
      return 12;
    }

    return null;
  }

  private toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value === 'string') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }

    if (typeof (value as { toNumber?: () => number }).toNumber === 'function') {
      const parsed = (value as { toNumber: () => number }).toNumber();
      return Number.isFinite(parsed) ? parsed : null;
    }

    const numeric = Number(value as number);
    return Number.isFinite(numeric) ? numeric : null;
  }

  /** C. Update one record in the table selected by :type. */
  async update(type: string, id: string, updateExternalListingDto: UpdateExternalListingDto) {
    const model = this.delegateFor(type);
    try {
      return await model.update({
        where: { id },
        // UpdateExternalListingDto only ever holds the fields the global
        // ValidationPipe whitelisted (see the DTO file) — safe to forward
        // straight to Prisma as the update payload.
        data: updateExternalListingDto as unknown as Record<string, unknown>,
      });
    } catch (error) {
      if (isRecordNotFound(error)) {
        throw new NotFoundException(`No "${type}" record found for id "${id}".`);
      }
      throw new BadRequestException('Unable to update the record.');
    }
  }

  /**
   * D. Hard delete: permanently removes the row from the table selected by
   * :type. No soft-delete/status flip — the record is gone.
   */
  async remove(type: string, id: string) {
    const model = this.delegateFor(type);
    try {
      return await model.delete({ where: { id } });
    } catch (error) {
      if (isRecordNotFound(error)) {
        throw new NotFoundException(`No "${type}" record found for id "${id}".`);
      }
      throw new BadRequestException('Unable to delete the record.');
    }
  }

  private delegateFor(type: string): ListingDelegate {
    const key = DELEGATE_KEY[type as ListingType];
    if (!key) {
      throw new BadRequestException(`Unknown type "${type}". Use one of: houses, lands, commercial.`);
    }
    // Every value in DELEGATE_KEY names a real Prisma delegate on PrismaService.
    return (this.prisma as unknown as Record<string, ListingDelegate>)[key];
  }
}

function isRecordNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && (error as { code?: string }).code === 'P2025';
}
