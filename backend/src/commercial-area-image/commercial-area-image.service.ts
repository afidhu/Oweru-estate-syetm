import { Injectable } from '@nestjs/common';
import { CreateCommercialAreaImageDto } from './dto/create-commercial-area-image.dto';
import { UpdateCommercialAreaImageDto } from './dto/update-commercial-area-image.dto';

@Injectable()
export class CommercialAreaImageService {
  create(createCommercialAreaImageDto: CreateCommercialAreaImageDto) {
    return 'This action adds a new commercialAreaImage';
  }

  findAll() {
    return `This action returns all commercialAreaImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commercialAreaImage`;
  }

  update(id: number, updateCommercialAreaImageDto: UpdateCommercialAreaImageDto) {
    return `This action updates a #${id} commercialAreaImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} commercialAreaImage`;
  }
}
