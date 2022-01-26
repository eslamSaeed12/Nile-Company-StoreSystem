import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, Validate, ValidateNested } from "class-validator";
import { Exist } from "../../database/validators/Exist";


class prod {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    quantity!: number;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'product' }])
    productId!: number
}

export class createOrder {

    @IsNotEmpty()
    @IsEnum([1, 2, 3, 4])
    state!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    paid!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    total_price!: number;


    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsOptional()
    paindUnit?: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    shipperId?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    supplierId?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    customerId!: number;

    @IsArray()
    @ValidateNested({ each: true })
    products!: Array<prod>;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}


export class updateOrder {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'order' }])
    id?: number;


    @IsNotEmpty()
    @IsEnum([1, 2, 3, 4])
    state!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    paid!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    total_price!: number;


    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsOptional()
    paindUnit?: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    shipperId?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    supplierId?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    customerId!: number;

    @IsArray()
    @ValidateNested({ each: true })
    products!: Array<prod>;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    notes?: string;



    @IsString()
    @IsOptional()
    csrf_token?: string;
}