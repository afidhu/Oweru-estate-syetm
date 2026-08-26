import { Module } from '@nestjs/common';
import { HouseForSaleService } from './house-for-sale.service';
import { HouseForSaleController } from './house-for-sale.controller';
import { PrismaModule } from '../prisma.config/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HouseForSaleController],
  providers: [HouseForSaleService],
})
export class HouseForSaleModule {}
