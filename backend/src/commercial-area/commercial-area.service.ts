import { Injectable } from '@nestjs/common';
import { CreateCommercialAreaDto } from './dto/create-commercial-area.dto';
import { UpdateCommercialAreaDto } from './dto/update-commercial-area.dto';

@Injectable()
export class CommercialAreaService {
  create(createCommercialAreaDto: CreateCommercialAreaDto) {
    return 'This action adds a new commercialArea';
  }

  findAll() {
    return `This action returns all commercialArea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commercialArea`;
  }

  update(id: number, updateCommercialAreaDto: UpdateCommercialAreaDto) {
    return `This action updates a #${id} commercialArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} commercialArea`;
  }
}
