import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { debtsService } from "../../services/debts.service";

@injectable()
export class financialController {


    constructor(protected service: debtsService) {
    }

    getDebts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.debts())
        } catch (err) {
            next(err)
        }
    }


    getFunds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.funds())
        } catch (err) {
            next(err)
        }
    }


    paidForAdebt = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { orderId, paid } = req.body;

            res.json(await this.service.paidAdebt(orderId, paid))
        } catch (err) {
            next(err)
        }
    }


}