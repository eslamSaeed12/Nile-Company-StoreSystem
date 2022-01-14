import { BadRequest } from "http-errors";
import { middlewre } from "../../modules/IMiddleware";
import { NextFunction, Response, Request } from "express";
import { injectable } from "tsyringe";
import { jwtService } from "../../services/jwt.service";

@injectable()
export class isJwtActiveMiddleware extends middlewre {
  constructor(private jwtService_: jwtService) {
    super();
  }

  use = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        req.cookies["X_META_TOKEN"] &&
        this.jwtService_.validate(req.cookies["X_META_TOKEN"])
      ) {
        throw new BadRequest("انت متصل بالفعل !");
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
}
