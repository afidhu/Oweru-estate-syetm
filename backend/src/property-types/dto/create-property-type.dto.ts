import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreatePropertyTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['COMMERCIAL_BUILDING', 'COMMERCIAL_LAND'])
  group: string;
}
