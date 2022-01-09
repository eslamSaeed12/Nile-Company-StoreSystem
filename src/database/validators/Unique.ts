import { container, inject, injectable } from "tsyringe";
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
} from "class-validator";
import { getRepository, QueryBuilder } from "typeorm";

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
  ): Promise<boolean> {

    const { entity, field } = validationArguments
      ?.constraints[0] as IUniqueCustomArgs;


    if (!entity || !field) {
      throw new Error(
        "you should put entity of uniquness and filed to check !"
      );
    }

    let ctx;

    // select true where ${entity}=${value}

    const exist = await getRepository(entity).createQueryBuilder().where(`${field}=:field`, { field: value }).getCount()

    return !exist;
  }

  defaultMessage(args: ValidationArguments) {
    return "Text ($value) is exist try another one !";
  }
}
