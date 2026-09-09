import { Injectable } from '@nestjs/common';
import { CreateCommercialAreaDto } from './dto/create-commercial-area.dto';
import { UpdateCommercialAreaDto } from './dto/update-commercial-area.dto';
import { PrismaService } from '../prisma.config/prisma.service';
import { PropertyMirrorService } from '../property-mirror/property-mirror.service';

@Injectable()
export class CommercialAreaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly propertyMirror: PropertyMirrorService,
  ) {}

  create(createCommercialAreaDto: CreateCommercialAreaDto) {
    const {
      features,
      images,
      documents,
      videos,
      broker,
      owner,
      brokerId,
      ownerId,
      propertyTypeId,
      propertyCategoryId,
      regionId,
      districtId,
      wardId,
      ...commercialData
    } = createCommercialAreaDto;
    return this.prisma.commercialArea.create({
      data: {
        ...commercialData,
        propertyType: propertyTypeId ? { connect: { id: propertyTypeId } } : undefined,
        propertyCategory: propertyCategoryId ? { connect: { id: propertyCategoryId } } : undefined,
        broker: broker ? { create: broker } : brokerId ? { connect: { id: brokerId } } : undefined,
        owner: owner ? { create: owner } : ownerId ? { connect: { id: ownerId } } : undefined,
        region: regionId ? { connect: { id: regionId } } : undefined,
        district: districtId ? { connect: { id: districtId } } : undefined,
        ward: wardId ? { connect: { id: wardId } } : undefined,
        features: features?.length ? { create: features.map((name) => ({ name })) } : undefined,
        images: images?.length ? { create: images } : undefined,
        documents: documents?.length ? { create: documents } : undefined,
        videos: videos?.length ? { create: videos } : undefined,
      } as any,
      include: { broker: true, owner: true, features: true, images: true, documents: true, videos: true },
    });
  }

  findAll() {
    return this.prisma.commercialArea.findMany({ include: { features: true, images: true, documents: true, videos: true } });
  }

  findOne(id: string) {
    return this.prisma.commercialArea.findUnique({ where: { id }, include: { propertyType: true, propertyCategory: true, broker: true, owner: true, region: true, district: true, ward: true, features: true, images: true, documents: true, videos: true } });
  }

  async update(id: string, updateCommercialAreaDto: UpdateCommercialAreaDto) {
    // ─── existing update logic — unchanged ───────────────────────────
    const updated = await this.prisma.commercialArea.update({ where: { id }, data: updateCommercialAreaDto as any });

    // ─── after-update hook: mirror into Property when status set to APPROVED ───
    await this.propertyMirror.syncApproved('commercial-area', id, updateCommercialAreaDto.status);

    return updated;
  }

  remove(id: string) {
    return this.prisma.commercialArea.delete({ where: { id } });
  }
}
