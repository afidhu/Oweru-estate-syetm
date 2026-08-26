import { PartialType } from '@nestjs/mapped-types';
import { CreateCommercialAreaImageDto } from './create-commercial-area-image.dto';

export class UpdateCommercialAreaImageDto extends PartialType(CreateCommercialAreaImageDto) {}
