import { Module } from '@nestjs/common';
import { ExternalPropertiesController } from './external-properties.controller';
import { ExternalPropertiesService } from './external-properties.service';
import { ExternalAuthGuard } from './external-auth.guard';

@Module({
  controllers: [ExternalPropertiesController],
  providers: [ExternalPropertiesService, ExternalAuthGuard],
})
export class ExternalPropertiesModule {}
