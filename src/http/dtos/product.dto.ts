import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { Unique } from "../../database/validators/Unique";

export class createProduct {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "product_name", entity: "Product" }])
    product_name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    product_description!: string;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    price!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsOptional()
    price_unit?: string;

    @IsNotEmpty()
    @IsInt()
    categoryId!: number;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}

export class updateProduct {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    id?: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "product_name", entity: "Product" }])
    product_name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    product_description!: string;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    price!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsOptional()
    price_unit?: string;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    categoryId!: number;

    @IsString()
    @IsOptional()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}