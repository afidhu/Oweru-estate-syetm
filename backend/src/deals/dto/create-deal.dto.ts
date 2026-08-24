import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsIn, IsEmail } from 'class-validator';

export class CreateDealDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  brokerId?: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsOptional()
  clientPhone?: string;

  @IsEmail()
  @IsOptional()
  clientEmail?: string;

  @IsString()
  @IsOptional()
  @IsIn(['OPEN', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST'])
  status?: string;

  @IsNumber()
  @IsOptional()
  agreedPrice?: number;
}
