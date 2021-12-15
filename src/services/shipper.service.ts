import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { PgConnection } from "../database/connections/pg.con";

@injectable()
export class shipperService {


    private dbContext: PrismaClient;

    constructor(provider: PgConnection) {
        this.dbContext = provider.getConnection();
    }


    async All() {
        return await this.dbContext.shipper.findMany();
    }

    async count() {
        return await this.dbContext.shipper.count();
    }


    async find(id: string) {
        return await this.dbContext.shipper.findFirst({ where: { id: parseInt(id) } });
    }

    async insert(dto: any) {

        return await this.dbContext.shipper.create({
            data: {
                shipper_addresse: dto.shipper_addresse,
                shipper_name: dto.shipper_name,
                shipper_phoneNumber: dto.shipper_phoneNumber,
                notes: dto.notes
            }
        })
    }

    async update(dto: any) {
        return await this.dbContext.shipper.update({
            where: { id: parseInt(dto.id) }, data: {
                shipper_addresse: dto.shipper_addresse,
                shipper_name: dto.shipper_name,
                shipper_phoneNumber: dto.shipper_phoneNumber,
                notes: dto.notes
            }
        })
    }

    async delete(id: string) {
        return await this.dbContext.shipper.delete({ where: { id: parseInt(id) } })
    }
}
