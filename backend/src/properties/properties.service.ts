import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: createPropertyDto,
    });
  }

  findAll() {
    return this.prisma.property.findMany();
  }

  findOne(id: number) {
    return this.prisma.property.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.prisma.property.update({
      where: { id: id.toString() },
      data: updatePropertyDto,
    });
  }

  remove(id: number) {
    return this.prisma.property.delete({
      where: { id: id.toString() },
    });
  }
}
