import { PartialType } from '@nestjs/mapped-types';
import { CreateLandForSaleDocumentDto } from './create-land-for-sale-document.dto';

export class UpdateLandForSaleDocumentDto extends PartialType(CreateLandForSaleDocumentDto) {}
