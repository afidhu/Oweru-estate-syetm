import { Injectable } from '@nestjs/common';
import { CreatePropertyDocumentDto } from './dto/create-property-document.dto';
import { UpdatePropertyDocumentDto } from './dto/update-property-document.dto';
import { PrismaService } from 'src/prisma.config/prisma.service';

@Injectable()
export class PropertyDocumentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPropertyDocumentDto: CreatePropertyDocumentDto) {
    return this.prisma.propertyDocument.create({
      data: createPropertyDocumentDto,
    });
  }

  findAll() {
    return this.prisma.propertyDocument.findMany();
  }

  findOne(id: number) {
    return this.prisma.propertyDocument.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: number, updatePropertyDocumentDto: UpdatePropertyDocumentDto) {
    return this.prisma.propertyDocument.update({
      where: { id: id.toString() },
      data: updatePropertyDocumentDto,
    });
  }

  remove(id: number) {
    return this.prisma.propertyDocument.delete({
      where: { id: id.toString() },
    });
  }
}
