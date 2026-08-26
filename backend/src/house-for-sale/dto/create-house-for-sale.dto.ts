import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID, IsIn, IsInt, Min, Max, IsNumber } from 'class-validator';

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
