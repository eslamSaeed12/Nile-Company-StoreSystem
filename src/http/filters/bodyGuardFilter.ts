import { NextFunction, Response, Request } from "express";
import { ValidationError } from "class-validator";
import { filter } from "../../modules/IMiddleware";
import { injectable } from "tsyringe";

@injectable()
export class BodyGuardFilter_ extends filter {
  use = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (Array.isArray(err) && err[0] instanceof ValidationError) {
      res.status(400).json(err);
      return;
    } else {
      next(err);
    }
  };
}
