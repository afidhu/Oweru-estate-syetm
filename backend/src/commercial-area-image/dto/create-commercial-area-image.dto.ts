import { IsString, IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateCommercialAreaImageDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  commercialId: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  isCover?: boolean;
}
