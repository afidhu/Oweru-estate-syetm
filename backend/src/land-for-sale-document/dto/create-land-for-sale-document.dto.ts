import { IsString, IsNotEmpty, IsUUID, IsOptional, IsInt } from 'class-validator';

export class CreateLandForSaleDocumentDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  landId: string;

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
