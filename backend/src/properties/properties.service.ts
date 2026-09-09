import { Injectable } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';
import { PrismaService } from '../prisma.config/prisma.service';

const num = (value: Prisma.Decimal | number | null): number | null =>
  value === null || value === undefined ? null : Number(value);

const list = (value: Prisma.JsonValue | null): unknown[] =>
  Array.isArray(value) ? value : [];

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const rows = await this.prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
    return { properties: rows.map((row) => this.toResponse(row)) };
  }

  private toResponse(p: Property) {
    return {
      externalId: p.externalId,
      status: p.status,
      title: p.title,
      description: p.description ?? null,
      category: p.category,
      price: num(p.price),
      rentMonths: p.rentMonths ?? null,
      bedrooms: p.bedrooms ?? null,
      bathrooms: p.bathrooms ?? null,
      houseType: p.houseType ?? null,
      size: { value: num(p.sizeValue), unit: p.sizeUnit ?? null },
      features: list(p.features),
      location: {
        region: p.locationRegion || null,
        district: p.locationDistrict || null,
        ward: p.locationWard ?? null,
        street: p.locationStreet ?? null,
        gpsLat: num(p.locationGpsLat),
        gpsLng: num(p.locationGpsLng),
      },
      owner: { fullName: p.ownerFullName ?? null, phone: p.ownerPhone ?? null },
      broker: { fullName: p.brokerFullName ?? null, phone: p.brokerPhone ?? null },
      images: list(p.images),
      videos: list(p.videos),
    };
  }
}
