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
      if (!req.user && !req.cookies["X_META_TOKEN"]) {
        throw new Unauthorized("you arent logined in ");
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
}
