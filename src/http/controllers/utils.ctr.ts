import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { UtilsService } from "../../services/utils.service";
import { searchService } from "../../services/search.service";

@injectable()
export class UtilsController {


    constructor(protected service: UtilsService, private searchService: searchService) {
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

    topShippers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getTopFiveShippers())
        } catch (err) {
            next(err)
        }
    }


    getLastYearFunds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.service.getFundsOflastYear())
        } catch (err) {
            next(err)
        }
    }



    serachForAtext = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { text } = req.body;
            res.json(await this.searchService.search(text))
        } catch (err) {
            next(err)
        }
    }

}