import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { Unique } from "../../database/validators/Unique";

export class createUser {
  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  @MinLength(6)
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
  id!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  @MinLength(6)
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
