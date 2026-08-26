import { Injectable } from '@nestjs/common';
import { CreateHouseForSaleImageDto } from './dto/create-house-for-sale-image.dto';
import { UpdateHouseForSaleImageDto } from './dto/update-house-for-sale-image.dto';

@Injectable()
export class HouseForSaleImageService {
  create(createHouseForSaleImageDto: CreateHouseForSaleImageDto) {
    return 'This action adds a new houseForSaleImage';
  }

  findAll() {
    return `This action returns all houseForSaleImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} houseForSaleImage`;
  }

  update(id: number, updateHouseForSaleImageDto: UpdateHouseForSaleImageDto) {
    return `This action updates a #${id} houseForSaleImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} houseForSaleImage`;
  }
}
