import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { PgConnection } from "../database/connections/pg.con";
import { createCustomer, updateCustomer } from "../http/dtos/customer.dto";

@injectable()
export class customerService {


    private dbContext: PrismaClient;

    constructor(provider: PgConnection) {
        this.dbContext = provider.getConnection();
    }

    async All() {
        return await this.dbContext.customer.findMany();
    }

    async count() {
        return await this.dbContext.customer.count();
    }

    async find(id: string) {
        return await this.dbContext.customer.findFirst({ where: { id: parseInt(id) } })
    }

    async insert(dto: createCustomer) {

        return await this.dbContext.customer.create({ data: dto })
    }

    async update(dto: updateCustomer) {
        return await this.dbContext.customer.update({
            where: {
                id: <number>dto.id
            },
            data: {
                customer_addresse: dto.customer_addresse,
                customer_name: dto.customer_name,
                customer_phoneNumber: dto.customer_phoneNumber,
                isProvider: dto.isProvider,
                notes: dto.notes
            }
        })
    }

    async delete(id: string) {
        return await this.dbContext.customer.delete({ where: { id: parseInt(id) } })
    }
}
