import { NextFunction } from "express-serve-static-core";
import { injectable } from "tsyringe";
import { filter } from "../../modules/IMiddleware";
import { Request, Response } from 'express'
import { NotFound } from 'http-errors'
import { EntityNotFoundError, TypeORMError } from 'typeorm'
@injectable()
export class TypeormErrorFilter extends filter {

    use = (err: any, req: Request, res: Response, next: NextFunction) => {

        if (Object.getPrototypeOf(err) === EntityNotFoundError.prototype) {
            throw new NotFound(err?.message);
        }

        return next(err);

    }
}