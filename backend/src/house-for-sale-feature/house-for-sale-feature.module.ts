import { Module } from '@nestjs/common';
import { HouseForSaleFeatureService } from './house-for-sale-feature.service';
import { HouseForSaleFeatureController } from './house-for-sale-feature.controller';

@Module({
  controllers: [HouseForSaleFeatureController],
  providers: [HouseForSaleFeatureService],
})
export class HouseForSaleFeatureModule {}
