import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { Unique } from "../../database/validators/Unique";

export class createCategory {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "title", entity: "Category" }])
    title!: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(4)
    notes?: string;


    @IsOptional()
    @IsString()
    csrf_token?: string;
}

export class updateCategory {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "title", entity: "Category" }])
    title!: string;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsOptional()
    @IsString()
    csrf_token?: string;
}