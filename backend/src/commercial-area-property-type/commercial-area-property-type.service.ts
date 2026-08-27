import { Injectable } from '@nestjs/common';
import { CreateCommercialAreaPropertyTypeDto } from './dto/create-commercial-area-property-type.dto';
import { UpdateCommercialAreaPropertyTypeDto } from './dto/update-commercial-area-property-type.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class CommercialAreaPropertyTypeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommercialAreaPropertyTypeDto: CreateCommercialAreaPropertyTypeDto) {
    return this.prisma.propertyType.create({
      data: createCommercialAreaPropertyTypeDto,
    });
  }

  findAll() {
    return this.prisma.propertyType.findMany();
  }

  findOne(id: number) {
    return this.prisma.propertyType.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateCommercialAreaPropertyTypeDto: UpdateCommercialAreaPropertyTypeDto) {
    return this.prisma.propertyType.update({
      where: { id: id.toString() },
      data: updateCommercialAreaPropertyTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.propertyType.delete({
      where: { id: id.toString() },
    });
  }
}
