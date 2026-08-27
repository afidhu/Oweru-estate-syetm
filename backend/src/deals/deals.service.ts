import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDealDto: CreateDealDto) {
    // return this.prisma.deal.create({
    //   data: createDealDto,
    // });
  }

  findAll() {
    // return this.prisma.deal.findMany();
  }

  findOne(id: number) {
    // return this.prisma.deal.findUnique({
    //   where: { id: id.toString() },
    // });
  }

  update(id: number, updateDealDto: UpdateDealDto) {
    // return this.prisma.deal.update({
    //   where: { id: id.toString() },
    //   data: updateDealDto,
    // });
  }

  remove(id: number) {
    // return this.prisma.deal.delete({
    //   where: { id: id.toString() },
    // });
  }
}
