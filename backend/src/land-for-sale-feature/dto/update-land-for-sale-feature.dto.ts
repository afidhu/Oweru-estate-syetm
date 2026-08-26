import { PartialType } from '@nestjs/mapped-types';
import { CreateLandForSaleFeatureDto } from './create-land-for-sale-feature.dto';

export class UpdateLandForSaleFeatureDto extends PartialType(CreateLandForSaleFeatureDto) {}
