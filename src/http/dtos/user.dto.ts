import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { Exist } from "../../database/validators/Exist";
import { ILegalUpdate } from "../../database/validators/ILegalUpdate";
import { Unique } from "../../database/validators/Unique";

export class createUser {
  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  @MinLength(4)
  @Validate(Unique, [{ entity: "user", field: "username" }])
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @MinLength(4)
  password!: string;


  @IsOptional()
  @IsString()
  csrf_token?: string;
}

export class updateUser {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Validate(Exist, [{ entity: 'user' }])
  id!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @MinLength(4)
  @Validate(Unique, [{ entity: "user", field: "username" }])
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  @Validate(ILegalUpdate)
  password!: string;


  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Validate(Exist, [{ entity: 'role' }])
  roleId!: number;

  @IsString()
  @MaxLength(64)
  @MinLength(4)
  @Transform(({ value }) => value === '' ? null : value)
  @IsOptional()
  newPassword?: string;


  @IsOptional()
  @IsString()
  csrf_token?: string;
}
