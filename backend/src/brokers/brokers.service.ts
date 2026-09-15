import { Injectable } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { PrismaService } from '../prisma.config/prisma.service';

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

  findOne(id: string) {
    return this.prisma.broker.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBrokerDto: UpdateBrokerDto) {
    return this.prisma.broker.update({
      where: { id },
      data: updateBrokerDto,
    });
  }

  remove(id: string) {
    return this.prisma.broker.delete({
      where: { id },
    });
  }
}
