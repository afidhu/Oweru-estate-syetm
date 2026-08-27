import { Injectable } from '@nestjs/common';
import { CreateCommercialAreaDto } from './dto/create-commercial-area.dto';
import { UpdateCommercialAreaDto } from './dto/update-commercial-area.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class CommercialAreaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommercialAreaDto: CreateCommercialAreaDto) {
    const {
      images,
      documents,
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
        images: images?.length ? { create: images } : undefined,
        documents: documents?.length ? { create: documents } : undefined,
      } as any,
      include: { broker: true, owner: true, images: true, documents: true },
    });
  }

  findAll() {
    return this.prisma.commercialArea.findMany({ include: { images: true, documents: true } });
  }

  findOne(id: string) {
    return this.prisma.commercialArea.findUnique({ where: { id }, include: { images: true, documents: true } });
  }

  update(id: string, updateCommercialAreaDto: UpdateCommercialAreaDto) {
    return this.prisma.commercialArea.update({ where: { id }, data: updateCommercialAreaDto as any });
  }

  remove(id: string) {
    return this.prisma.commercialArea.delete({ where: { id } });
  }
}
