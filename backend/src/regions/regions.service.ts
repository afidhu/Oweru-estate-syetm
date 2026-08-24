import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class RegionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRegionDto: CreateRegionDto) {
    return this.prisma.region.create({
      data: createRegionDto,
    });
  }

  findAll() {
    return this.prisma.region.findMany();
  }

  findOne(id: number) {
    return this.prisma.region.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return this.prisma.region.update({
      where: { id: id.toString() },
      data: updateRegionDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
