import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID, IsIn, IsInt, Min, Max, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonInputDto } from '../../owners/dto/person-input.dto';

class HouseImageInput {
  @IsString()
  url: string;

  @IsBoolean()
  @IsOptional()
  isCover?: boolean;
}

class HouseDocumentInput {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  fileType?: string;

  @IsInt()
  @IsOptional()
  sizeBytes?: number;
}

export class CreateHouseForSaleDto {
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
  houseTypeId?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  bedrooms?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  bathrooms?: number;

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
  @Type(() => HouseImageInput)
  @IsOptional()
  images?: HouseImageInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HouseDocumentInput)
  @IsOptional()
  documents?: HouseDocumentInput[];
}
