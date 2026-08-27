import { IsString } from "class-validator";

export class CreateCommercialAreaPropertyTypeDto {
    @IsString()
    name: string;
    @IsString()
    group: string;
}
