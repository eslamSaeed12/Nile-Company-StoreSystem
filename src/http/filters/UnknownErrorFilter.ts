import { NextFunction } from "express-serve-static-core";
import { injectable } from "tsyringe";
import { filter } from "../../modules/IMiddleware";
import { Request, Response } from 'express'
import { InternalServerError } from 'http-errors'
@injectable()
export class UnknownErrorFilter extends filter {

    use = (err: any, req: Request, res: Response, next: NextFunction) => {

        console.error(err);
        
        return res.status(500).json(new InternalServerError(err?.message))

    }
}