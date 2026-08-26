import { Injectable } from '@nestjs/common';
import { CreateHouseForSaleFeatureDto } from './dto/create-house-for-sale-feature.dto';
import { UpdateHouseForSaleFeatureDto } from './dto/update-house-for-sale-feature.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class HouseForSaleFeatureService {
  constructor(private readonly prisma:PrismaService){}
 async create(createHouseForSaleFeatureDto: CreateHouseForSaleFeatureDto) {
    return await this.prisma.houseForSaleFeature.create({
      data: createHouseForSaleFeatureDto
    })
  }

  async findAll() {
    return await this.prisma.houseForSaleFeature.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.houseForSaleFeature.findUnique({
      where: {
        id: id.toString()
      }
    });
  }

  async update(id: number, updateHouseForSaleFeatureDto: UpdateHouseForSaleFeatureDto) {
    return await this.prisma.houseForSaleFeature.update({
      where: {
        id: id.toString()
      },
      data: updateHouseForSaleFeatureDto
    });
  }

  async remove(id: number) {
    return await this.prisma.houseForSaleFeature.delete({
      where: {
        id: id.toString()
      }
    });
  }
}
