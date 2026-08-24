import { Injectable } from '@nestjs/common';
import { CreateHouseTypeDto } from './dto/create-house-type.dto';
import { UpdateHouseTypeDto } from './dto/update-house-type.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class HouseTypesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createHouseTypeDto: CreateHouseTypeDto) {
    return this.prisma.houseType.create({
      data: createHouseTypeDto,
    });
  }

  findAll() {
    return this.prisma.houseType.findMany();
  }

  findOne(id: number) {
    return this.prisma.houseType.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateHouseTypeDto: UpdateHouseTypeDto) {
    return this.prisma.houseType.update({
      where: { id: id.toString() },
      data: updateHouseTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.houseType.delete({
      where: { id: id.toString() },
    });
  }
}
