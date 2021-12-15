import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToClass } from "class-transformer"
import { validateOrReject } from "class-validator";
export interface IRequestGuard {
  check(req: Request): boolean | Promise<boolean>;
}

export class BodyGuard {
  public static validate(ruler: ClassConstructor<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const { body, query, params } = req;
        const RequestBag = plainToClass(ruler, { ...body, ...params, ...query }); // 
        await validateOrReject(RequestBag, { stopAtFirstError: true })
        next();
      } catch (err) {
        next(err)
      }
    }

  }
}