import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateOwnerDto {
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

  @IsEmail()
  @IsOptional()
  email?: string;
}
