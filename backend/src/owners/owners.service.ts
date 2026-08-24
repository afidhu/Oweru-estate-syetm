import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

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

  findOne(id: number) {
    return this.prisma.owner.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return  this.prisma.owner.update({
      where: { id: id.toString() },
      data: updateOwnerDto,
    });
  }

  remove(id: number) {
    return this.prisma.owner.delete({
      where: { id: id.toString() },
    });
  }
}
