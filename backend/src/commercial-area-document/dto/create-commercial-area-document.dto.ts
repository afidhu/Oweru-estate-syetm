import { IsString, IsNotEmpty, IsUUID, IsOptional, IsInt } from 'class-validator';

export class CreateCommercialAreaDocumentDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  commercialId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  fileType?: string;

  @IsInt()
  @IsOptional()
  sizeBytes?: number;
}
