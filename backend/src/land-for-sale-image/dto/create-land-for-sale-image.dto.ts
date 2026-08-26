import { IsString, IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateLandForSaleImageDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  landId: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  isCover?: boolean;
}
