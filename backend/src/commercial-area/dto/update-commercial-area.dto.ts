import { PartialType } from '@nestjs/mapped-types';
import { CreateCommercialAreaDto } from './create-commercial-area.dto';

export class UpdateCommercialAreaDto extends PartialType(CreateCommercialAreaDto) {}
