import { NextFunction } from "express";
import { BadRequest, Unauthorized } from "http-errors";
import { injectable } from "tsyringe";
import { User } from "../../database/models/User";
import { middlewre } from "../../modules/IMiddleware";
import { jwtService } from "../../services/jwt.service";
import { userService } from "../../services/user.service";

@injectable()
export class JwtCheckerMiddleware extends middlewre {
  constructor(private jwtService_: jwtService, private userService: userService) {
    super();
  }

  use = async (req: any, res: any, next: NextFunction) => {
    try {
      const token = req.cookies["X_META_JWT"]
        ? req.cookies["X_META_JWT"]
        : null;

      if (!req.cookies["X_META_JWT"]) {
        throw new BadRequest("you arent logined yet !");
      }

      if (!this.jwtService_.validate(token)) {
        throw new Unauthorized("not valid authentication token");
      } else {
        const decoded = <User>await this.jwtService_.decode(req.cookies["X_META_JWT"]);
        const loginedUser = await this.userService.find(decoded.id.toString());
        req.user = loginedUser;
        next();
      }
    } catch (err) {
      next(err);
    }
  };

}
