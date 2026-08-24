import { Injectable } from '@nestjs/common';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class PropertyTypesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPropertyTypeDto: CreatePropertyTypeDto) {
    return this.prisma.propertyType.create({
      data: createPropertyTypeDto,
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

  update(id: number, updatePropertyTypeDto: UpdatePropertyTypeDto) {
    return this.prisma.propertyType.update({
      where: { id: id.toString() },
      data: updatePropertyTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.propertyType.delete({
      where: { id: id.toString() },
    });
  }
}
