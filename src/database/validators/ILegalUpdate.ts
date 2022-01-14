import { container, injectable } from "tsyringe";
import {
    ValidatorConstraintInterface,
    ValidatorConstraint,
    ValidationArguments,
} from "class-validator";
import { Connection } from "typeorm";
import { User } from "../models/User";
import { UseCtx } from "../../modules/ctxHook";

@injectable()
@ValidatorConstraint({ async: true })
export class ILegalUpdate implements ValidatorConstraintInterface {
    async validate(
        value: any,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {

        let con = container.resolve(Connection);
        const HttpCtx = UseCtx();
        const { id } = { ...HttpCtx.request.body, ...HttpCtx.request.params, ...HttpCtx.request.query } as any;
        // select true where ${entity}=${value}
        let exist = await con.getRepository(User).createQueryBuilder('User').where('password = :p', { p: value })
            .andWhere(`id = :id `, { id: id })
            .execute()

        return exist?.length;
    }

    defaultMessage(args: ValidationArguments) {
        return "illegal password update !";
    }
}
