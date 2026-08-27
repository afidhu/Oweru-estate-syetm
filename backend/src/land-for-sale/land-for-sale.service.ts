import { Injectable } from '@nestjs/common';
import { CreateLandForSaleDto } from './dto/create-land-for-sale.dto';
import { UpdateLandForSaleDto } from './dto/update-land-for-sale.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class LandForSaleService {
  constructor(private readonly prisma:PrismaService){}
  create(createLandForSaleDto: CreateLandForSaleDto) {
    const { features, images, documents, broker, owner, brokerId, ownerId, ...landData } = createLandForSaleDto;
    return this.prisma.landForSale.create({
      data: {
        ...landData,
        broker: broker ? { create: broker } : brokerId ? { connect: { id: brokerId } } : undefined,
        owner: owner ? { create: owner } : ownerId ? { connect: { id: ownerId } } : undefined,
        features: features?.length ? { create: features.map((name) => ({ name })) } : undefined,
        images: images?.length ? { create: images } : undefined,
        documents: documents?.length ? { create: documents } : undefined,
      } as any,
      include: { broker: true, owner: true, features: true, images: true, documents: true },
    });
  }

  findAll() {
    return this.prisma.landForSale.findMany();
  }

  findOne(id: string) {
    return this.prisma.landForSale.findUnique({
      where: { id },
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
