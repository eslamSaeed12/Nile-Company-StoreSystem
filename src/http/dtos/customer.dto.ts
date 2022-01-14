import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { Exist } from "../../database/validators/Exist";
import { Unique } from "../../database/validators/Unique";

export class createCustomer {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "customer_name", entity: "Customer" }])
    customer_name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    customer_addresse!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    customer_phoneNumber!: string;

    @IsBoolean()
    @Transform(({ value }) => Boolean(value))
    isProvider!: boolean;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}

export class updateCustomer {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'customer' }])
    id!: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "customer_name", entity: "Customer" }])
    customer_name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    customer_addresse!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    customer_phoneNumber!: string;

    @IsBoolean()
    @Transform(({ value }) => Boolean(value))
    isProvider!: boolean;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value === '' ? null : value)
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}