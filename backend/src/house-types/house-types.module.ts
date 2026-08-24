import { Module } from '@nestjs/common';
import { HouseTypesService } from './house-types.service';
import { HouseTypesController } from './house-types.controller';

@Module({
  controllers: [HouseTypesController],
  providers: [HouseTypesService],
})
export class HouseTypesModule {}
