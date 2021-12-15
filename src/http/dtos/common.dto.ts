import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PrimaryKey {
    @IsNotEmpty()
    @IsInt()
    id!: Number;

    @IsOptional()
    @IsString()
    csrf_token?: string;
}