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
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    price!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
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
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    price!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
    price_unit?: string;

    @IsNotEmpty()
    @IsInt()
    categoryId!: number;

    @IsString()
    @IsOptional()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}