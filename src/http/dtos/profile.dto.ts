import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength, Validate } from "class-validator";
import { Exist } from "../../database/validators/Exist";
import { ILegalUpdate } from "../../database/validators/ILegalUpdate";




export class _getToken_ {

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'user' }])
    id!: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    password!: string;
}


export class _UpdateProfile_ {

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'user' }])
    id!: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    @MinLength(4)
    username!: string;

    @IsOptional()
    @Transform(({ value }) => value === '' ? null : value)
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    password!: string;

    @IsString()
    @Length(32)
    confirmationToken!: string;
}