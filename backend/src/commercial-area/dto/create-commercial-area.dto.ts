import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsIn, Min, Max, IsArray, IsBoolean, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonInputDto } from '../../owners/dto/person-input.dto';

class CommercialImageInput {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  isCover?: boolean;
}

class CommercialDocumentInput {
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

export class CreateCommercialAreaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['SALE', 'RENT'])
  listingType: string;

  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @IsNumber()
  @IsOptional()
  monthlyRent?: number;

  @IsString()
  @IsOptional()
  @IsIn(['MONTHLY', '3_MONTHS', '4_MONTHS', '6_MONTHS', 'YEARLY'])
  rentalTerm?: string;

  @IsString()
  @IsOptional()
  @IsIn(['sqm', 'acre', 'plot', 'metre', 'feet'])
  sizeUnit?: string;

  @IsNumber()
  @IsOptional()
  size?: number;

  @IsUUID()
  @IsOptional()
  propertyTypeId?: string;

  @IsUUID()
  @IsOptional()
  propertyCategoryId?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'ARCHIVED'])
  status?: string;

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
  @ValidateNested({ each: true })
  @Type(() => CommercialImageInput)
  @IsOptional()
  images?: CommercialImageInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommercialDocumentInput)
  @IsOptional()
  documents?: CommercialDocumentInput[];
}
