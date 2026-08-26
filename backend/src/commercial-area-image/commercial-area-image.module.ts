import { Module } from '@nestjs/common';
import { CommercialAreaImageService } from './commercial-area-image.service';
import { CommercialAreaImageController } from './commercial-area-image.controller';

@Module({
  controllers: [CommercialAreaImageController],
  providers: [CommercialAreaImageService],
})
export class CommercialAreaImageModule {}
