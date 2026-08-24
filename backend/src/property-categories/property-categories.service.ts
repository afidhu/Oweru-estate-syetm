import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.config/prisma.service';
import { CreatePropertyCategoryDto } from './dto/create-property-category.dto';
import { UpdatePropertyCategoryDto } from './dto/update-property-category.dto';

@Injectable()
export class PropertyCategoriesService {
  constructor(private readonly prisma:PrismaService){}
  async create(createPropertyCategoryDto: CreatePropertyCategoryDto) {
    const category = await this.prisma.propertyCategory.create({
      data: createPropertyCategoryDto
    })
    return category;
  }

  async findAll() {
    const categories = await this.prisma.propertyCategory.findMany();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.prisma.propertyCategory.findUnique({
      where: {
        id
      }
    })
    return category;
  }

  async update(id: string, updatePropertyCategoryDto: UpdatePropertyCategoryDto) {
    const category = await this.prisma.propertyCategory.update({
      where: {
        id
      },
      data: updatePropertyCategoryDto
    })
    return category;
  }

  async remove(id: string) {
    const category = await this.prisma.propertyCategory.delete({
      where: {
        id
      }
    })
    return category;
  }
}
