import { Role, User } from "@prisma/client";
import { NextFunction } from "express";
import { injectable } from "tsyringe";
import { authService } from "../../services/auth.service";
import { jwtService } from "../../services/jwt.service";
import { NotFound } from "http-errors"

@injectable()
export class AuthController {


    constructor(protected service: authService, private jwtService: jwtService) {

    }


    ok = (req: any, res: any, next: NextFunction) => {
        const user = req.user;
        res.status(200).json({
            username: user.username, role: {
                id: user.role.id,
                title: user.role.title
            },
            id: user.id,
            authenticated: true
        });
    }

    login = async (req: any, res: any, next: NextFunction) => {
        try {
            const { username, password } = req.body;
            const authenticated = <User & { role: Role }>await this.service.authenticate({ username, password });

            if (authenticated) {

                res.cookie("X_META_JWT", this.jwtService.encode({
                    id: authenticated.id,
                    role: authenticated.role,
                    username: authenticated.username
                }), {
                    expires: Date.now() + 86400,
                    httpOnly: process.env.NODE_ENV?.toUpperCase() === "DEVELOPMENT",
                    secure: process.env.NODE_ENV?.toUpperCase() === "PRODUCTION",
                    maxAge: Date.now() + 86400
                });

                res.json({
                    username: authenticated.username, role: {
                        id: authenticated.role.id,
                        title: authenticated.role.title
                    },
                    id: authenticated.id,
                    authenticated: true
                })
                return;
            }

            throw new NotFound("user ceredentials not valid");

        } catch (err) {
            next(err);
        }
    }

    logout = async (req: any, res: any, next: NextFunction) => {
        try {
            res.clearCookie("X_META_JWT");
            res.json("ok").status(200);
        } catch (err) {
            next(err);
        }
    }

}
