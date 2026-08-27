import { Module } from '@nestjs/common';
import { CommercialAreaService } from './commercial-area.service';
import { CommercialAreaController } from './commercial-area.controller';
import { PrismaModule } from '../prisma.config/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommercialAreaController],
  providers: [CommercialAreaService],
})
export class CommercialAreaModule {}
