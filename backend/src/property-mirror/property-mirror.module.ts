import { Global, Module } from '@nestjs/common';
import { PropertyMirrorService } from './property-mirror.service';

/**
 * Global so any feature service (HouseForSale, LandForSale, CommercialArea, …)
 * can inject `PropertyMirrorService` without wiring it into every module.
 * PrismaModule is already @Global, so PrismaService resolves here for free.
 */
@Global()
@Module({
  providers: [PropertyMirrorService],
  exports: [PropertyMirrorService],
})
export class PropertyMirrorModule {}
