import { Injectable } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class WardsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createWardDto: CreateWardDto) {
    return this.prisma.ward.create({
      data: createWardDto,
    });
  }

  findAll() {
    return `This action returns all wards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ward`;
  }

  update(id: number, updateWardDto: UpdateWardDto) {
    return `This action updates a #${id} ward`;
  }

  remove(id: number) {
    return `This action removes a #${id} ward`;
  }
}
