import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLandTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
