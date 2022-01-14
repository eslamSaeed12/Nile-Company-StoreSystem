import { container, injectable } from "tsyringe";
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
} from "class-validator";
import { Connection } from "typeorm";
import { UseCtx } from "../../modules/ctxHook";

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

    let ctx = container.resolve(Connection);

    // select true where ${entity}=${value}

    const request = UseCtx();

    let exist;
    const id = request?.request?.body?.id;

    if (id) {
      exist = await ctx.getRepository(entity)
      .createQueryBuilder()
      .where(`id != :id `, { id })
      .andWhere(`${field}=:field`, { field: value })
      .execute()
    } else {
      exist = await ctx.getRepository(entity).createQueryBuilder().where(`${field}=:field`, { field: value }).execute();
    }


    return !exist.length;
  }

  defaultMessage(args: ValidationArguments) {
    return "Text ($value) is exist try another one !";
  }
}
