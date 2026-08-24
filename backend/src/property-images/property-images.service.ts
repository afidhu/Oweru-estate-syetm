import { Injectable } from '@nestjs/common';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class PropertyImagesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPropertyImageDto: CreatePropertyImageDto) {
    return this.prisma.propertyImage.create({
      data: createPropertyImageDto,
    });
  }

  findAll() {
    return this.prisma.propertyImage.findMany();
  }

  findOne(id: number) {
    return this.prisma.propertyImage.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updatePropertyImageDto: UpdatePropertyImageDto) {
    return this.prisma.propertyImage.update({
      where: { id: id.toString() },
      data: updatePropertyImageDto,
    });
  }

  remove(id: number) {
    return this.prisma.propertyImage.delete({
      where: { id: id.toString() },
    });
  }
}
