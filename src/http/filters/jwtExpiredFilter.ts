import { NextFunction } from "express-serve-static-core";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { injectable } from "tsyringe";
import { filter } from "../../modules/IMiddleware";
import { Request, Response } from 'express'

@injectable()
export class JwtErrorFilter extends filter {

    use = (err: Request, req: Request, res: Response, next: NextFunction) => {

        if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {

            res.status(401).json({ message: 'انتهت صلاحية الجلسة برجاء اعادة تسجيل الدخول' })
            
        } else {
            next(err);
        }
    }
}