import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PersonInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  nid?: string;

  @IsString()
  @IsOptional()
  tin?: string;
}