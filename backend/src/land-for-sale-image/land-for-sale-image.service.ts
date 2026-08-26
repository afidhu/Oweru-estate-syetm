import { Injectable } from '@nestjs/common';
import { CreateLandForSaleImageDto } from './dto/create-land-for-sale-image.dto';
import { UpdateLandForSaleImageDto } from './dto/update-land-for-sale-image.dto';

@Injectable()
export class LandForSaleImageService {
  create(createLandForSaleImageDto: CreateLandForSaleImageDto) {
    return 'This action adds a new landForSaleImage';
  }

  findAll() {
    return `This action returns all landForSaleImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} landForSaleImage`;
  }

  update(id: number, updateLandForSaleImageDto: UpdateLandForSaleImageDto) {
    return `This action updates a #${id} landForSaleImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} landForSaleImage`;
  }
}
