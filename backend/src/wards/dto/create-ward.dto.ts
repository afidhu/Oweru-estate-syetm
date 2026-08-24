import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  districtId: string;
}