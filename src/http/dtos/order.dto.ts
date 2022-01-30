import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, Validate, ValidateIf, ValidateNested } from "class-validator";
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
    discount!: number;
    
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    paid?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ValidateIf((o, v) => v !== null)
    shipperId?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ValidateIf((o, v) => v !== null)
    supplierId?: number;

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    customerId!: number;

    @IsArray()
    @ValidateNested({ each: true })
    products!: Array<prod>;

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
    discount!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    paid?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ValidateIf((o, v) => v !== null)
    shipperId?: number;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ValidateIf((o, v) => v !== null)
    supplierId?: number;

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    customerId!: number;

    @IsArray()
    @ValidateNested({ each: true })
    products!: Array<prod>;

    @IsString()
    @IsOptional()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}