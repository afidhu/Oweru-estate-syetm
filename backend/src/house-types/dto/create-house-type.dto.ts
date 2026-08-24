import { IsString, IsNotEmpty } from 'class-validator';

export class CreateHouseTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
