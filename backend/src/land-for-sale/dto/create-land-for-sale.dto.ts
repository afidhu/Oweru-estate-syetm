import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsIn, Min, Max, IsArray, IsBoolean, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonInputDto } from '../../owners/dto/person-input.dto';

class LandImageInput {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  isCover?: boolean;
}

class LandDocumentInput {
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

class LandVideoInput {
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

export class CreateLandForSaleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  salePrice: number;

  @IsString()
  @IsOptional()
  @IsIn(['sqm', 'acre', 'plot', 'metre', 'feet'])
  sizeUnit?: string;

  @IsNumber()
  @IsOptional()
  size?: number;

  @IsUUID()
  @IsOptional()
  landTypeId?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ACTIVE', 'PENDING', 'SOLD', 'ARCHIVED'])
  status?: string;

  @IsUUID()
  @IsOptional()
  propertyCategoryId?: string;

  @IsUUID()
  @IsOptional()
  brokerId?: string;

  @IsUUID()
  @IsOptional()
  ownerId?: string;

  @ValidateNested()
  @Type(() => PersonInputDto)
  @IsOptional()
  broker?: PersonInputDto;

  @ValidateNested()
  @Type(() => PersonInputDto)
  @IsOptional()
  owner?: PersonInputDto;

  @IsUUID()
  @IsOptional()
  regionId?: string;

  @IsUUID()
  @IsOptional()
  districtId?: string;

  @IsUUID()
  @IsOptional()
  wardId?: string;

  @IsString()
  @IsOptional()
  exactLocation?: string;

  @IsNumber()
  @IsOptional()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ENGLISH', 'KISWAHILI'])
  language?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LandImageInput)
  @IsOptional()
  images?: LandImageInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LandDocumentInput)
  @IsOptional()
  documents?: LandDocumentInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LandVideoInput)
  @IsOptional()
  videos?: LandVideoInput[];
}
