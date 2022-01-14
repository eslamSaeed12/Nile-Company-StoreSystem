import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { productService } from "../../services/product.service";
@injectable()
export class productController {


    constructor(protected service: productService) {
    }

    isUniqueUpdate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, product_name } = req.params;
            res.status(200).json(await this.service.isUniqueButNotMe(id, product_name));
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


    checkPname = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { product_name } = req.body;
            const isExist = await this.service.checkProductName(product_name);

            if (isExist) {
                res.json(true);
            } else {
                res.json(false)
            }
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
            const { categoryId, quantity, product_name, product_description, price_unit, price, notes } = req.body;
            let x = await this.service.insert({ categoryId, quantity, product_name, product_description, price_unit, price, notes });
            res.json(x)
        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, categoryId, quantity, product_name, product_description, price_unit, price, notes } = req.body;
            res.json(await this.service.update({ id: parseInt(id), categoryId, quantity, product_name, product_description, price_unit, price, notes }))
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