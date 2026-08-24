import { Injectable } from '@nestjs/common';
import { CreatePropertyFeatureDto } from './dto/create-property-feature.dto';
import { UpdatePropertyFeatureDto } from './dto/update-property-feature.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class PropertyFeaturesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPropertyFeatureDto: CreatePropertyFeatureDto) {
    return this.prisma.propertyFeature.create({
      data: createPropertyFeatureDto,
    });
  }

  findAll() {
    return this.prisma.propertyFeature.findMany();
  }

  findOne(id: number) {
    return this.prisma.propertyFeature.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updatePropertyFeatureDto: UpdatePropertyFeatureDto) {
    return this.prisma.propertyFeature.update({
      where: { id: id.toString() },
      data: updatePropertyFeatureDto,
    });
  }

  remove(id: number) {
    return this.prisma.propertyFeature.delete({
      where: { id: id.toString() },
    });
  }
}
