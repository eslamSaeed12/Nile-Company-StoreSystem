import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

export class createOrder {

    @IsNotEmpty()
    @IsEnum(["PENDING", "FAIL", "DONE"])
    state!: string;

    @IsNotEmpty()
    @IsInt()
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    price!: number;

    @IsNotEmpty()
    @IsNumber()
    total!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
    paindUnit?: string;

    @IsOptional()
    @IsInt()
    shipperId?: number;

    @IsOptional()
    @IsInt()
    supplierId?: number;

    @IsOptional()
    @IsInt()
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
    id?: number;

    @IsNotEmpty()
    @IsEnum(["PENDING", "FAIL", "DONE"])
    state!: string;

    @IsNotEmpty()
    @IsInt()
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    price!: number;

    @IsNotEmpty()
    @IsNumber()
    total!: number;


    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    @MinLength(2)
    paindUnit?: string;

    @IsOptional()
    @IsInt()
    shipperId?: number;

    @IsOptional()
    @IsInt()
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
    productId!: number;
    
    @IsOptional()
    @IsInt()
    orderId!: number;
}