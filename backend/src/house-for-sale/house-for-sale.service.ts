import { Injectable } from '@nestjs/common';
import { CreateHouseForSaleDto } from './dto/create-house-for-sale.dto';
import { UpdateHouseForSaleDto } from './dto/update-house-for-sale.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class HouseForSaleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createHouseForSaleDto: CreateHouseForSaleDto) {
    return this.prisma.houseForSale.create({
      data: createHouseForSaleDto as any,
    });
  }

  findAll() {
    return this.prisma.houseForSale.findMany();
  }

  findOne(id: string) {
    return this.prisma.houseForSale.findUnique({
      where: { id },
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
