import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { categoryService } from "../../services/category.service";

@injectable()
export class CategoryController {


    constructor(protected service: categoryService) {
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