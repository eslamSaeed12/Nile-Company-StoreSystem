import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToClass } from "class-transformer"
import { validateOrReject } from "class-validator";
import { Authorize, resources, Abilites } from "../services/authorization.service";
import { Unauthorized } from "http-errors"
import { User } from "../database/models/User";
import { Role } from "../database/models/Role";
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


export class GateGuard {
  public static Authroize(action: Abilites, resource: resources) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const RequestWithUser = <Request & { user: User }>req;
        const userAbilitees = Authorize.getAbilites(RequestWithUser.user);
        if (userAbilitees.can(action, resource) || userAbilitees.can("CRUD", resource) || userAbilitees.can("CRUD", "ALL")) {
          next();
          return;
        }

        throw new Unauthorized("غير مسموح !");

      } catch (err) {
        next(err)
      }
    }

  }
}