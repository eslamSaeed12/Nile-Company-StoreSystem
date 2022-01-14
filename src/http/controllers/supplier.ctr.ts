import { injectable } from "tsyringe";
import { supplierService } from "../../services/supplier.service";
import { Request, Response, NextFunction } from "express"

@injectable()
export class supplierController {


    constructor(protected service: supplierService) {
    }

    findByName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { Supplier_name } = req.params;

            const isExist = await this.service.findByName(Supplier_name);

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
            const { id, Supplier_name } = req.params;
            res.status(200).json(await this.service.isUniqueButNotMe(id, Supplier_name));
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
            const { Supplier_company, Supplier_name, supplier_addresse, supplier_phoneNumber, notes } = req.body;

            res.json(await this.service.insert({ Supplier_company, Supplier_name, supplier_addresse, supplier_phoneNumber, notes }))
        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, Supplier_company, Supplier_name, supplier_addresse, supplier_phoneNumber, notes } = req.body;
            res.json(await this.service.update({ id: parseInt(id), Supplier_company, Supplier_name, supplier_addresse, supplier_phoneNumber, notes }))
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