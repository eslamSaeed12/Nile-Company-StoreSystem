import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

export class createOrder {

    @IsNotEmpty()
    @IsEnum(["PENDING", "FAIL", "DONE"])
    state!: string;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    price!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    total!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
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
    @Type(() => Number)
    products!: Array<Number>;

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
    id?: number;

    @IsNotEmpty()
    @IsEnum(["PENDING", "FAIL", "DONE"])
    state!: string;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    price!: number;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    total!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
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
    customerId!: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number)
    products!: Array<Number>;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}

export class order_sync {
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    productId!: number;
    
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    orderId!: number;
}