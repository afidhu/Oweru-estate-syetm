import { PartialType } from '@nestjs/mapped-types';
import { CreateCommercialAreaPropertyTypeDto } from './create-commercial-area-property-type.dto';

export class UpdateCommercialAreaPropertyTypeDto extends PartialType(CreateCommercialAreaPropertyTypeDto) {}
