import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsIn, Min, Max } from 'class-validator';

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
}
