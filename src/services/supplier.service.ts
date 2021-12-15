import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { PgConnection } from "../database/connections/pg.con";

@injectable()
export class supplierService {


    private dbContext: PrismaClient;

    constructor(provider: PgConnection) {
        this.dbContext = provider.getConnection();
    }

    async All() {
        return await this.dbContext.supplier.findMany();
    }

    async count() {
        return await this.dbContext.supplier.count();
    }

    async find(id: string) {
        return await this.dbContext.supplier.findFirst({ where: { id: parseInt(id) } })
    }

    async insert(dto: any) {
        return await this.dbContext.supplier.create({
            data: {
                Supplier_company: dto.Supplier_company,
                Supplier_name: dto.Supplier_name,
                supplier_addresse: dto.supplier_addresse,
                supplier_phoneNumber: dto.supplier_phoneNumber,
                notes: dto.notes,
            }
        })
    }

    async update(dto: any) {
        return await this.dbContext.supplier.update({
            where: {
                id: parseInt(dto.id)
            },
            data: {
                Supplier_company: dto.Supplier_company,
                Supplier_name: dto.Supplier_name,
                supplier_addresse: dto.supplier_addresse,
                supplier_phoneNumber: dto.supplier_phoneNumber,
                notes: dto.notes,
            }
        })
    }

    async delete(id: string) {
        return await this.dbContext.supplier.delete({ where: { id: parseInt(id) } })
    }
}
