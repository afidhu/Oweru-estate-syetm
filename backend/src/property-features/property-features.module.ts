import { Module } from '@nestjs/common';
import { PropertyFeaturesService } from './property-features.service';
import { PropertyFeaturesController } from './property-features.controller';

@Module({
  controllers: [PropertyFeaturesController],
  providers: [PropertyFeaturesService],
})
export class PropertyFeaturesModule {}
