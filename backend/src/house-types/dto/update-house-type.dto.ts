import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseTypeDto } from './create-house-type.dto';

export class UpdateHouseTypeDto extends PartialType(CreateHouseTypeDto) {}
