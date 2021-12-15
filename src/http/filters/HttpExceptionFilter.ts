import { NextFunction, Response, Request } from "express";
import { HttpError } from "http-errors";
import { injectable } from "tsyringe";
import { filter } from "../../modules/IMiddleware";

@injectable()
export class HtppExceptionFilter extends filter {
  use = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json(err);
      console.log(err);
      return;
    } else {
      next(err);
    }
  };
}
