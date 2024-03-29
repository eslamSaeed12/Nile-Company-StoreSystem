import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { roleService } from "../../services/role.service";

@injectable()
export class roleController {


    constructor(protected service: roleService) {
    }


    findByName = async (req: any, res: any, next: NextFunction) => {
        try {
            const { title } = req.params;

            const isExist = await this.service.findByName(title);

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
            const { id, title } = req.params;
            res.status(200).json(await this.service.isUniqueButNotMe(id, title));
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
            const { title } = req.body;

            res.json(await this.service.insert({ title }))
        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, title, notes } = req.body;
            res.json(await this.service.update({ id: parseInt(id), title, notes }))
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