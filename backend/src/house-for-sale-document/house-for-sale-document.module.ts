import { Module } from '@nestjs/common';
import { HouseForSaleDocumentService } from './house-for-sale-document.service';
import { HouseForSaleDocumentController } from './house-for-sale-document.controller';

@Module({
  controllers: [HouseForSaleDocumentController],
  providers: [HouseForSaleDocumentService],
})
export class HouseForSaleDocumentModule {}
