import { Injectable } from '@nestjs/common';
import { CreateCommercialAreaDocumentDto } from './dto/create-commercial-area-document.dto';
import { UpdateCommercialAreaDocumentDto } from './dto/update-commercial-area-document.dto';

@Injectable()
export class CommercialAreaDocumentService {
  create(createCommercialAreaDocumentDto: CreateCommercialAreaDocumentDto) {
    return 'This action adds a new commercialAreaDocument';
  }

  findAll() {
    return `This action returns all commercialAreaDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commercialAreaDocument`;
  }

  update(id: number, updateCommercialAreaDocumentDto: UpdateCommercialAreaDocumentDto) {
    return `This action updates a #${id} commercialAreaDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} commercialAreaDocument`;
  }
}
