import { PartialType } from '@nestjs/mapped-types';
import { CreateLandTypeDto } from './create-land-type.dto';

export class UpdateLandTypeDto extends PartialType(CreateLandTypeDto) {}
