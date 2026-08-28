import { Injectable } from '@nestjs/common';
import { CreateHouseForSaleDto } from './dto/create-house-for-sale.dto';
import { UpdateHouseForSaleDto } from './dto/update-house-for-sale.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class HouseForSaleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createHouseForSaleDto: CreateHouseForSaleDto) {
    const { features, images, documents, videos, broker, owner, brokerId, districtId,regionId,wardId,ownerId,propertyCategoryId,houseTypeId, ...houseData } = createHouseForSaleDto;
    return this.prisma.houseForSale.create({
      data: {
        ...houseData,
         houseType:houseTypeId ? { connect: { id:houseTypeId } } : undefined,
         propertyCategory:propertyCategoryId ? { connect: { id:propertyCategoryId } } : undefined,
         district:districtId ? { connect: { id:districtId } } : undefined,
         region:regionId ? { connect: { id:regionId } } : undefined,
         ward:wardId ? { connect: { id:wardId } } : undefined,
        broker: broker ? { create: broker } : brokerId ? { connect: { id: brokerId } } : undefined,
        owner: owner ? { create: owner } : ownerId ? { connect: { id: ownerId } } : undefined,
        features: features?.length ? { create: features.map((name) => ({ name })) } : undefined,
        images: images?.length ? { create: images } : undefined,
        documents: documents?.length ? { create: documents } : undefined,
        videos: videos?.length ? { create: videos } : undefined,
      } as any,
      include: { houseType: true, broker: true, owner: true, features: true, images: true, documents: true, videos: true },
    });
  }

  findAll() {
    return this.prisma.houseForSale.findMany({
      include:{
        houseType: true,
        broker: true,
        owner: true,
        features: true,
        images: true,
        documents: true,
        videos: true,
      }
    });
  }

  findOne(id: string) {
    return this.prisma.houseForSale.findUnique({
      where: { id },
      include: { houseType: true, propertyCategory: true, broker: true, owner: true, region: true, district: true, ward: true, features: true, images: true, documents: true, videos: true },
    });
  }

  update(id: string, updateHouseForSaleDto: UpdateHouseForSaleDto) {
    return this.prisma.houseForSale.update({
      where: { id },
      data: updateHouseForSaleDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.houseForSale.delete({
      where: { id },
    });
  }
}
