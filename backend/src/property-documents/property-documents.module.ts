import { Module } from '@nestjs/common';
import { PropertyDocumentsService } from './property-documents.service';
import { PropertyDocumentsController } from './property-documents.controller';

@Module({
  controllers: [PropertyDocumentsController],
  providers: [PropertyDocumentsService],
})
export class PropertyDocumentsModule {}
