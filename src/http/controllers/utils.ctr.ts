import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { UtilsService } from "../../services/utils.service";

@injectable()
export class UtilsController {


    constructor(protected service: UtilsService) {
    }


    getStats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getFinancialSums())
        } catch (err) {
            next(err)
        }
    }


    topCustomers = async (eq: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getTopCustomers())
        } catch (err) {
            next(err)
        }
    }


    topSuppliers = async (eq: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getTopFiveSuppliers())
        } catch (err) {
            next(err)
        }
    }

    topProducts = async (eq: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getTopFiveProducts())
        } catch (err) {
            next(err)
        }
    }

    topFiveCategories = async (eq: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getTopFiveCategories())
        } catch (err) {
            next(err)
        }
    }

    topShippers = async (eq: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getTopFiveShippers())
        } catch (err) {
            next(err)
        }
    }




}