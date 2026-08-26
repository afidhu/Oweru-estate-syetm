import { Injectable } from '@nestjs/common';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class CommissionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCommissionDto: CreateCommissionDto) {
    // return this.prisma.commission.create({
    //   data: createCommissionDto,
    // });
  }

  findAll() {
    // return this.prisma.commission.findMany();
  }

  findOne(id: number) {
    // return this.prisma.commission.findUnique({
    //   where: { id: id.toString() },
    // });
  }

  update(id: number, updateCommissionDto: UpdateCommissionDto) {
    // return this.prisma.commission.update({
    //   where: { id: id.toString() },
    //   data: updateCommissionDto,
    // });
  }

  remove(id: number) {
    // return this.prisma.commission.delete({
    //   where: { id: id.toString() },
    // });
  }
}
