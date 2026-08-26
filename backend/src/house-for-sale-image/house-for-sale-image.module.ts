import { Module } from '@nestjs/common';
import { HouseForSaleImageService } from './house-for-sale-image.service';
import { HouseForSaleImageController } from './house-for-sale-image.controller';

@Module({
  controllers: [HouseForSaleImageController],
  providers: [HouseForSaleImageService],
})
export class HouseForSaleImageModule {}
