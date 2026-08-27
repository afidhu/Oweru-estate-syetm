import { Module } from '@nestjs/common';
import { CommercialAreaPropertyTypeService } from './commercial-area-property-type.service';
import { CommercialAreaPropertyTypeController } from './commercial-area-property-type.controller';
import { PrismaModule } from '../prisma.config/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommercialAreaPropertyTypeController],
  providers: [CommercialAreaPropertyTypeService],
})
export class CommercialAreaPropertyTypeModule {}
