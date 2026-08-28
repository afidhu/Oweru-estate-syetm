import { Injectable } from '@nestjs/common';
import { CreateLandForSaleDto } from './dto/create-land-for-sale.dto';
import { UpdateLandForSaleDto } from './dto/update-land-for-sale.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class LandForSaleService {
  constructor(private readonly prisma:PrismaService){}
  create(createLandForSaleDto: CreateLandForSaleDto) {
    const { features, images, documents, videos, broker, owner,regionId,wardId,districtId,landTypeId,propertyCategoryId, brokerId, ownerId, ...landData } = createLandForSaleDto;
    return this.prisma.landForSale.create({
      data: {
        ...landData,
        landType: landTypeId ? { connect: { id: landTypeId } } : undefined,
        district: districtId ? { connect: { id: districtId } } : undefined,
        ward: wardId ? { connect: { id: wardId } } : undefined,
        region: regionId ? { connect: { id: regionId } } : undefined,
        propertyCategory: propertyCategoryId ? { connect: { id: propertyCategoryId } } : undefined,
        broker: broker ? { create: broker } : brokerId ? { connect: { id: brokerId } } : undefined,
        owner: owner ? { create: owner } : ownerId ? { connect: { id: ownerId } } : undefined,
        features: features?.length ? { create: features.map((name) => ({ name })) } : undefined,
        images: images?.length ? { create: images } : undefined,
        documents: documents?.length ? { create: documents } : undefined,
        videos: videos?.length ? { create: videos } : undefined,
      } as any,
      include: { broker: true, owner: true, features: true, images: true, documents: true, videos: true },
    });
  }

  findAll() {
    return this.prisma.landForSale.findMany();
  }

  findOne(id: string) {
    return this.prisma.landForSale.findUnique({
      where: { id },
      include: { landType: true, propertyCategory: true, broker: true, owner: true, region: true, district: true, ward: true, features: true, images: true, documents: true, videos: true },
    });
  }

  update(id: string, updateLandForSaleDto: UpdateLandForSaleDto) {
    return this.prisma.landForSale.update({
      where: { id },
      data: updateLandForSaleDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.landForSale.delete({
      where: { id },
    });
  }
}
