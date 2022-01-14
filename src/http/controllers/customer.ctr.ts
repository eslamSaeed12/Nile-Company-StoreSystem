import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { customerService } from "../../services/customer.service";
import { createCustomer, updateCustomer } from "../dtos/customer.dto";

@injectable()
export class customerController {


    constructor(protected service: customerService) {
    }

    findByName = async (req: any, res: any, next: NextFunction) => {
        try {
            const { customer_name } = req.params;

            const isExist = await this.service.findByName(customer_name);

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
            const { id, customer_name } = req.params;
            res.status(200).json(await this.service.isUniqueButNotMe(id, customer_name));
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
            const dto = <createCustomer>req.body;

            res.json(await this.service.insert(dto))
        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, customer_addresse, customer_name, customer_phoneNumber, isProvider, notes } = <updateCustomer>req.body;
            res.json(await this.service.update({ id: id, customer_addresse, customer_name, customer_phoneNumber, isProvider, notes }))
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