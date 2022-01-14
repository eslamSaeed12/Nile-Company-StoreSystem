import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { userService } from "../../services/user.service";

@injectable()
export class userController {


    constructor(protected service: userService) {

    }


    findByName = async (req: any, res: any, next: NextFunction) => {
        try {
            const { username } = req.params;

            const isExist = await this.service.findByName(username);

            if (isExist?.length) {
                res.json(true);
            } else {
                res.json(false)
            }
        } catch (err) {
            next(err)
        }
    }




    isUniqueUpdate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, username } = req.params;
            res.status(200).json(await this.service.isUniqueButNotMe(id, username));
        } catch (err) {
            next(err)
        }
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
            const { id, username, password, newPassword, roleId } = req.body;
            res.json(await this.service.update({ id, username, password, newPassword, roleId }))
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