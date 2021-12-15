import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { Unique } from "../../database/validators/Unique";

export class createShipper {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "shipper_name", entity: "Shipper" }])
    shipper_name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    shipper_addresse!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    shipper_phoneNumber!: string;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsOptional()
    @IsString()
    csrf_token?: string;
}

export class updateShipper {
    @IsNotEmpty()
    @IsInt()
    id?: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "shipper_name", entity: "Shipper" }])
    shipper_name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    shipper_addresse!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    shipper_phoneNumber!: string;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsOptional()
    @IsString()
    csrf_token?: string;
}