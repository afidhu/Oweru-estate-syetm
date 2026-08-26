import { Module } from '@nestjs/common';
import { LandForSaleDocumentService } from './land-for-sale-document.service';
import { LandForSaleDocumentController } from './land-for-sale-document.controller';

@Module({
  controllers: [LandForSaleDocumentController],
  providers: [LandForSaleDocumentService],
})
export class LandForSaleDocumentModule {}
