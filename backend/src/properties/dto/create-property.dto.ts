import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsUUID, IsIn, IsInt, Min, Max } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsOptional()
  houseTypeId?: string;

  @IsUUID()
  @IsOptional()
  landTypeId?: string;

  @IsUUID()
  @IsOptional()
  propertyTypeId?: string;

  // Pricing
  @IsNumber()
  @IsOptional()
  monthlyRent?: number;

  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @IsString()
  @IsOptional()
  @IsIn(['MONTHLY', '3_MONTHS', '4_MONTHS', '6_MONTHS', 'YEARLY'])
  rentalTerm?: string;

  // Size
  @IsNumber()
  @IsOptional()
  size?: number;

  @IsString()
  @IsOptional()
  @IsIn(['sqm', 'acre', 'plot', 'metre', 'feet'])
  sizeUnit?: string;

  // House specific
  @IsInt()
  @IsOptional()
  @Min(0)
  bedrooms?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  bathrooms?: number;

  // Status
  @IsString()
  @IsOptional()
  @IsIn(['ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'ARCHIVED'])
  status?: string;

  // People
  @IsUUID()
  @IsOptional()
  brokerId?: string;

  @IsUUID()
  @IsOptional()
  ownerId?: string;

  // Location
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

  // Description
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ENGLISH', 'KISWAHILI'])
  language?: string;
}
