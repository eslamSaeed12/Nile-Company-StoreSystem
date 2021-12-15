import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
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
    @IsNumber()
    id?: Number;

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
    isProvider!: boolean;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    notes?: string;


    @IsString()
    @IsOptional()
    csrf_token?: string;
}