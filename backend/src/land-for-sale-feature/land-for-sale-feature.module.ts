import { Module } from '@nestjs/common';
import { LandForSaleFeatureService } from './land-for-sale-feature.service';
import { LandForSaleFeatureController } from './land-for-sale-feature.controller';

@Module({
  controllers: [LandForSaleFeatureController],
  providers: [LandForSaleFeatureService],
})
export class LandForSaleFeatureModule {}
