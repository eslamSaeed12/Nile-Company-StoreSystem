import { NextFunction } from "express";
import { Unauthorized } from "http-errors";
import { injectable } from "tsyringe";
import { middlewre } from "../../modules/IMiddleware";
@injectable()
export class AuthenticatedMiddleware extends middlewre {
  constructor() {
    super();
  }
  use = (req: any, res: any, next: NextFunction) => {
    try {
      if (!req.user && !req.cookies["X_META_JWT"]) {
        throw new Unauthorized("لم تقم بالتسجيل بعد ! ");
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
}
