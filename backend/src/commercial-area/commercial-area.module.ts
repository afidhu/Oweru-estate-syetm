import { Module } from '@nestjs/common';
import { CommercialAreaService } from './commercial-area.service';
import { CommercialAreaController } from './commercial-area.controller';

@Module({
  controllers: [CommercialAreaController],
  providers: [CommercialAreaService],
})
export class CommercialAreaModule {}
