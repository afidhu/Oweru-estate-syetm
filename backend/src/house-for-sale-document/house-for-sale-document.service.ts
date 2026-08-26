import { Injectable } from '@nestjs/common';
import { CreateHouseForSaleDocumentDto } from './dto/create-house-for-sale-document.dto';
import { UpdateHouseForSaleDocumentDto } from './dto/update-house-for-sale-document.dto';

@Injectable()
export class HouseForSaleDocumentService {
  create(createHouseForSaleDocumentDto: CreateHouseForSaleDocumentDto) {
    return 'This action adds a new houseForSaleDocument';
  }

  findAll() {
    return `This action returns all houseForSaleDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} houseForSaleDocument`;
  }

  update(id: number, updateHouseForSaleDocumentDto: UpdateHouseForSaleDocumentDto) {
    return `This action updates a #${id} houseForSaleDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} houseForSaleDocument`;
  }
}
