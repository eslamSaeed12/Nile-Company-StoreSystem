import { injectable } from "tsyringe";
import { supplierService } from "../../services/supplier.service";
import { Request, Response, NextFunction } from "express"
import { customerService } from "../../services/customer.service";
import { createCustomer, updateCustomer } from "../dtos/customer.dto";

@injectable()
export class customerController {


    constructor(protected service: customerService) {
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