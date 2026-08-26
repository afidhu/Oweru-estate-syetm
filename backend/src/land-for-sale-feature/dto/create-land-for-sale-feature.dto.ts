import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLandForSaleFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  landId: string;
}
