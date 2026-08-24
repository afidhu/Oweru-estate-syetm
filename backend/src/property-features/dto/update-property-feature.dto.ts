import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyFeatureDto } from './create-property-feature.dto';

export class UpdatePropertyFeatureDto extends PartialType(CreatePropertyFeatureDto) {}
