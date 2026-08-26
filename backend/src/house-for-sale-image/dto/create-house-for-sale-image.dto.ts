import { IsString, IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateHouseForSaleImageDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  houseId: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  isCover?: boolean;
}
