import { Injectable } from '@nestjs/common';
import { CreateLandTypeDto } from './dto/create-land-type.dto';
import { UpdateLandTypeDto } from './dto/update-land-type.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class LandTypesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createLandTypeDto: CreateLandTypeDto) {
    return this.prisma.landType.create({
      data: createLandTypeDto,
    });
  }

  findAll() {
    return this.prisma.landType.findMany();
  }

  findOne(id: number) {
    return this.prisma.landType.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateLandTypeDto: UpdateLandTypeDto) {
    return this.prisma.landType.update({
      where: { id: id.toString() },
      data: updateLandTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.landType.delete({
      where: { id: id.toString() },
    });
  }
}
