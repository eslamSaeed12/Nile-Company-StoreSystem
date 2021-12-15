import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { Unique } from "../../database/validators/Unique";

export class createRole {
  @IsNotEmpty()
  @IsString()
  @Validate(Unique, [{ field: "title", entity: "Role" }])
  title!: string;


  @IsOptional()
  @IsString()
  csrf_token?: string;
}

export class updateRole {
  @IsNotEmpty()
  @IsInt()
  id?: number;

  @IsString()
  @Validate(Unique, [{ field: "title", entity: "Role" }])
  title!: string;


  @IsOptional()
  @IsString()
  csrf_token?: string;
}