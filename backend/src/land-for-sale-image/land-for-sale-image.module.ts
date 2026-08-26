import { Module } from '@nestjs/common';
import { LandForSaleImageService } from './land-for-sale-image.service';
import { LandForSaleImageController } from './land-for-sale-image.controller';

@Module({
  controllers: [LandForSaleImageController],
  providers: [LandForSaleImageService],
})
export class LandForSaleImageModule {}
