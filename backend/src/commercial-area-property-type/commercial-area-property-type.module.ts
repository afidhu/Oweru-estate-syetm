import { Module } from '@nestjs/common';
import { CommercialAreaPropertyTypeService } from './commercial-area-property-type.service';
import { CommercialAreaPropertyTypeController } from './commercial-area-property-type.controller';

@Module({
  controllers: [CommercialAreaPropertyTypeController],
  providers: [CommercialAreaPropertyTypeService],
})
export class CommercialAreaPropertyTypeModule {}
