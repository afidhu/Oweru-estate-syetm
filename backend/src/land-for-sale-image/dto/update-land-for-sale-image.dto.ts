import { PartialType } from '@nestjs/mapped-types';
import { CreateLandForSaleImageDto } from './create-land-for-sale-image.dto';

export class UpdateLandForSaleImageDto extends PartialType(CreateLandForSaleImageDto) {}
