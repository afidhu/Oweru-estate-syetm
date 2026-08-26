import { Injectable } from '@nestjs/common';
import { CreateCommercialAreaPropertyTypeDto } from './dto/create-commercial-area-property-type.dto';
import { UpdateCommercialAreaPropertyTypeDto } from './dto/update-commercial-area-property-type.dto';

@Injectable()
export class CommercialAreaPropertyTypeService {
  create(createCommercialAreaPropertyTypeDto: CreateCommercialAreaPropertyTypeDto) {
    return 'This action adds a new commercialAreaPropertyType';
  }

  findAll() {
    return `This action returns all commercialAreaPropertyType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commercialAreaPropertyType`;
  }

  update(id: number, updateCommercialAreaPropertyTypeDto: UpdateCommercialAreaPropertyTypeDto) {
    return `This action updates a #${id} commercialAreaPropertyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} commercialAreaPropertyType`;
  }
}
