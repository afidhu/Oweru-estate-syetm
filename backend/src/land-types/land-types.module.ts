import { Module } from '@nestjs/common';
import { LandTypesService } from './land-types.service';
import { LandTypesController } from './land-types.controller';

@Module({
  controllers: [LandTypesController],
  providers: [LandTypesService],
})
export class LandTypesModule {}
