import { container, injectable } from "tsyringe";
import {
    ValidatorConstraintInterface,
    ValidatorConstraint,
    ValidationArguments,
} from "class-validator";
import { Connection } from "typeorm";

export interface IExistCustomArgs {
    id: string;
    entity: string;
}

@injectable()
@ValidatorConstraint({ async: true })
export class Exist implements ValidatorConstraintInterface {
    async validate(
        value: any,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {

        const { entity } = validationArguments
            ?.constraints[0] as IExistCustomArgs;


        if (!entity) {
            throw new Error(
                "you should put entity of exitstance to check !"
            );
        }

        let ctx = container.resolve(Connection);

        // select true where ${entity}=${value}
        let exist = await ctx.getRepository(entity)
            .createQueryBuilder()
            .where(`id = :id `, { id: value })
            .execute()

        return exist?.length;
    }

    defaultMessage(args: ValidationArguments) {
        return "id ($value) you seek for is not exist !";
    }
}
