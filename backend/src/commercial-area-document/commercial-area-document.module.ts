import { Module } from '@nestjs/common';
import { CommercialAreaDocumentService } from './commercial-area-document.service';
import { CommercialAreaDocumentController } from './commercial-area-document.controller';

@Module({
  controllers: [CommercialAreaDocumentController],
  providers: [CommercialAreaDocumentService],
})
export class CommercialAreaDocumentModule {}
