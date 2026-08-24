import { Injectable } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class BrokersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBrokerDto: CreateBrokerDto) {
    return this.prisma.broker.create({
      data: createBrokerDto,
    });
  }

  findAll() {
    return this.prisma.broker.findMany();
  }

  findOne(id: number) {
    return this.prisma.broker.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateBrokerDto: UpdateBrokerDto) {
    return this.prisma.broker.update({
      where: { id: id.toString() },
      data: updateBrokerDto,
    });
  }

  remove(id: number) {
    return this.prisma.broker.delete({
      where: { id: id.toString() },
    });
  }
}
