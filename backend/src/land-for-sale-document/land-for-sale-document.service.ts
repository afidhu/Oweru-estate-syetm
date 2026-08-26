import { Injectable } from '@nestjs/common';
import { CreateLandForSaleDocumentDto } from './dto/create-land-for-sale-document.dto';
import { UpdateLandForSaleDocumentDto } from './dto/update-land-for-sale-document.dto';

@Injectable()
export class LandForSaleDocumentService {
  create(createLandForSaleDocumentDto: CreateLandForSaleDocumentDto) {
    return 'This action adds a new landForSaleDocument';
  }

  findAll() {
    return `This action returns all landForSaleDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} landForSaleDocument`;
  }

  update(id: number, updateLandForSaleDocumentDto: UpdateLandForSaleDocumentDto) {
    return `This action updates a #${id} landForSaleDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} landForSaleDocument`;
  }
}
