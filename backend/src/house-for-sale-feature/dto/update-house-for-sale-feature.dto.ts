import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseForSaleFeatureDto } from './create-house-for-sale-feature.dto';

export class UpdateHouseForSaleFeatureDto extends PartialType(CreateHouseForSaleFeatureDto) {}
