import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { userService } from "../../services/user.service";

@injectable()
export class userController {


    constructor(protected service: userService) {
        
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.All())
        } catch (err) {
            next(err)
        }
    }

    find = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            res.json(await this.service.find(id))
        } catch (err) {
            next(err)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password, roleId } = req.body;

            res.json(await this.service.insert({ username, password, roleId }))
        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, username, password, roleId } = req.body;
            const isPasswordChanged = password !== (await this.service.find(id))?.password;

            res.json(await this.service.update({ id: parseInt(id), username, password, roleId }, isPasswordChanged))
        } catch (err) {
            next(err)
        }
    }

    delete = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id } = req.body;
            res.json(await this.service.delete(id));
        } catch (err) {
            next(err)
        }
    }

}