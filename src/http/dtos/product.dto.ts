import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, validate, Validate } from "class-validator";
import { Exist } from "../../database/validators/Exist";
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
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    price!: number;


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

export class updateProduct {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'Product' }])
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
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    price!: number;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    categoryId!: number;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}