import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class FeaturesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFeatureDto: CreateFeatureDto) {
    return this.prisma.feature.create({
      data: createFeatureDto,
    });
  }

  findAll() {
    return this.prisma.feature.findMany();
  }

  findOne(id: number) {
    return this.prisma.feature.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return this.prisma.feature.update({
      where: { id: id.toString() },
      data: updateFeatureDto,
    });
  }

  remove(id: number) {
    return this.prisma.feature.delete({
      where: { id: id.toString() },
    });
  }
}
