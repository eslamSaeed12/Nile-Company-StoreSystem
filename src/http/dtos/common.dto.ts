import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class PrimaryKey {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    id!: number;

    @IsOptional()
    @IsString()
    csrf_token?: string;
}



export class searchText {

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => String(value))
    @MaxLength(255)
    text!: string;
}