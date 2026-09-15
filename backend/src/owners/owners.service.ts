import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class OwnersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOwnerDto: CreateOwnerDto) {
    return this.prisma.owner.create({
      data: createOwnerDto,
    });
  }

  findAll() {
    return this.prisma.owner.findMany();
  }

  findOne(id: string) {
    return this.prisma.owner.findUnique({
      where: { id },
    });
  }

  update(id: string, updateOwnerDto: UpdateOwnerDto) {
    return this.prisma.owner.update({
      where: { id },
      data: updateOwnerDto,
    });
  }

  remove(id: string) {
    return this.prisma.owner.delete({
      where: { id },
    });
  }
}
