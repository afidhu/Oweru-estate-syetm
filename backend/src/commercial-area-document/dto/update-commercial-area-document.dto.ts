import { PartialType } from '@nestjs/mapped-types';
import { CreateCommercialAreaDocumentDto } from './create-commercial-area-document.dto';

export class UpdateCommercialAreaDocumentDto extends PartialType(CreateCommercialAreaDocumentDto) {}
