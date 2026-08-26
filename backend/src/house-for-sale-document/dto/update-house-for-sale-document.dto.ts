import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseForSaleDocumentDto } from './create-house-for-sale-document.dto';

export class UpdateHouseForSaleDocumentDto extends PartialType(CreateHouseForSaleDocumentDto) {}
