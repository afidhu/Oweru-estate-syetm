import { Injectable } from '@nestjs/common';
import { CreateLandForSaleDto } from './dto/create-land-for-sale.dto';
import { UpdateLandForSaleDto } from './dto/update-land-for-sale.dto';

@Injectable()
export class LandForSaleService {
  create(createLandForSaleDto: CreateLandForSaleDto) {
    return 'This action adds a new landForSale';
  }

  findAll() {
    return `This action returns all landForSale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} landForSale`;
  }

  update(id: number, updateLandForSaleDto: UpdateLandForSaleDto) {
    return `This action updates a #${id} landForSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} landForSale`;
  }
}
