import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDocumentDto } from './create-property-document.dto';

export class UpdatePropertyDocumentDto extends PartialType(CreatePropertyDocumentDto) {}
