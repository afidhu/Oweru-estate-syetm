import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseForSaleImageDto } from './create-house-for-sale-image.dto';

export class UpdateHouseForSaleImageDto extends PartialType(CreateHouseForSaleImageDto) {}
