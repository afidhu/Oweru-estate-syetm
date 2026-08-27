import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class DistrictsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDistrictDto: CreateDistrictDto) {
    return this.prisma.district.create({
      data: createDistrictDto,
    });
  }

  findAll() {
    return this.prisma.district.findMany();
  }

  findOne(id: number) {
    return this.prisma.district.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.prisma.district.update({
      where: { id: id.toString() },
      data: updateDistrictDto,
    });
  }

  remove(id: number) {
    return this.prisma.district.delete({
      where: { id: id.toString() },
    });
  }
}
