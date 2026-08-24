import { IsString, IsNotEmpty, IsUUID, IsNumber, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateCommissionDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  dealId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  brokerId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsOptional()
  percentage?: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;

  @IsDate()
  @IsOptional()
  paidAt?: Date;
}
