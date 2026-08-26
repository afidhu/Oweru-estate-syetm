import { Module } from '@nestjs/common';
import { LandForSaleService } from './land-for-sale.service';
import { LandForSaleController } from './land-for-sale.controller';

@Module({
  controllers: [LandForSaleController],
  providers: [LandForSaleService],
})
export class LandForSaleModule {}
