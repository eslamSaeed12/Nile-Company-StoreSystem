import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";


export class AuthLogin {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  password!: string;


  // csrf token
  @IsOptional()
  @IsString()
  csrf_token?: string;
}

export class AuthRegister {

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  username!: string;


  @IsOptional()
  @IsString()
  csrf_token?: string;
}
