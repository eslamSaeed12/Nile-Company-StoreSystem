import { injectable } from "tsyringe";
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
} from "class-validator";
import { PgConnection } from "../connections/pg.con";

export interface IUniqueCustomArgs {
  entity: string;
  field: string;
}

@injectable()
@ValidatorConstraint({ async: true })
export class Unique implements ValidatorConstraintInterface {
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
    con?: PgConnection
  ): Promise<boolean> {
    const { entity, field } = validationArguments
      ?.constraints[0] as IUniqueCustomArgs;

    if (!entity || field) {
      throw new Error(
        "you should put entity of uniquness and filed to check !"
      );
    }

    let ctx;
    
    if (con) {
      ctx = con.getConnection();
      return await ctx.$queryRaw`select true where ${entity}=${value}`
    };

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return "Text ($value) is exist try another one !";
  }
}
