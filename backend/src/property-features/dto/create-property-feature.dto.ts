import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePropertyFeatureDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  featureId: string;
}
