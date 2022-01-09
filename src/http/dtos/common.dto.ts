import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PrimaryKey {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    id!: number;

    @IsOptional()
    @IsString()
    csrf_token?: string;
}