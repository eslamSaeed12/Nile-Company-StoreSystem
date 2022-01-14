import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { Exist } from "../../database/validators/Exist";
import { Unique } from "../../database/validators/Unique";

export class createSupplier {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "Supplier.Supplier_name", entity: "supplier" }])
    Supplier_name!: string;


    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    Supplier_company!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    supplier_addresse!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    supplier_phoneNumber!: string;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsOptional()
    @IsString()
    csrf_token?: string;
}

export class updateSupplier {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'Supplier' }])
    id?: number;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @Validate(Unique, [{ field: "Supplier.Supplier_name", entity: "Supplier" }])
    Supplier_name!: string;


    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    Supplier_company!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    supplier_addresse!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    supplier_phoneNumber!: string;

    @IsOptional()
    @IsString()
    notes?: string;


    @IsOptional()
    @IsString()
    csrf_token?: string;
}