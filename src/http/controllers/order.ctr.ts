import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { orderService } from "../../services/order.service";

@injectable()
export class orderController {


    constructor(protected service: orderService) {
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
            const { customerId, shipperId, supplierId, paid, state, products, discount, notes } = req.body;
            res.json(await this.service.insert({ customerId, paid, state, shipperId, supplierId, discount, products, notes }));

        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, customerId, paid, shipperId, supplierId, state, products, discount, notes } = req.body;
            res.json(await this.service.update({ id, customerId, state, paid, shipperId, supplierId, discount, products, notes }))
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