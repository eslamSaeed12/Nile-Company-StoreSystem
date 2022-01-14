import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express"
import { shipperService } from "../../services/shipper.service";

@injectable()
export class shipperController {


    constructor(protected service: shipperService) {
    }


    findByName = async (req: any, res: any, next: NextFunction) => {
        try {
            const { shipper_name } = req.params;

            const isExist = await this.service.findByName(shipper_name);

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
            const { id, shipper_name } = req.params;
            res.status(200).json(await this.service.isUniqueButNotMe(id, shipper_name));
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
            const { shipper_addresse, shipper_name, shipper_phoneNumber, notes } = req.body;


            res.json(await this.service.insert({ shipper_addresse, shipper_name, shipper_phoneNumber, notes }))
        } catch (err) {
            next(err)
        }
    }


    update = async (req: any, res: any, next: NextFunction) => {
        try {
            const { id, shipper_addresse, shipper_name, shipper_phoneNumber, notes } = req.body;
            res.json(await this.service.update({ id: parseInt(id), shipper_addresse, shipper_name, shipper_phoneNumber, notes }))
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