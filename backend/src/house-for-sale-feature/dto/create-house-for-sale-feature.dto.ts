import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHouseForSaleFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  houseId: string;
}
