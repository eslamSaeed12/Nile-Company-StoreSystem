import { NextFunction } from "express";
import { BadRequest, Unauthorized } from "http-errors";
import { injectable } from "tsyringe";
import { middlewre } from "../../modules/IMiddleware";
import { jwtService } from "../../services/jwt.service";

@injectable()
export class JwtCheckerMiddleware extends middlewre {
  constructor(private jwtService_: jwtService) {
    super();
  }

  use = (req: any, res: any, next: NextFunction) => {
    try {
      const token = req.cookies["X_META_TOKEN"]
        ? req.cookies["X_META_TOKEN"]
        : null;

      if (!req.cookies["X_META_TOKEN"]) {
        throw new BadRequest("you arent logined yet !");
      }

      if (!this.jwtService_.validate(token)) {
        throw new Unauthorized("not valid authentication token");
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
}
