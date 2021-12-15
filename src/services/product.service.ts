import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { PgConnection } from "../database/connections/pg.con";

@injectable()
export class productService {

    private dbContext: PrismaClient;

    constructor(provider: PgConnection) {
        this.dbContext = provider.getConnection();
    }


    async All() {
        return await this.dbContext.product.findMany({
            include: {
                category: true,
            },
        })
    }

    async count() {
        return await this.dbContext.product.count();
    }


    async find(id: string) {
        return await this.dbContext.product.findFirst({ where: { id: parseInt(id) } })
    }

    async insert(dto: any) {
        return await this.dbContext.product.create({
            data: {
                price: dto.price,
                price_unit: dto.price_unit,
                product_description: dto.product_description,
                product_name: dto.product_name,
                quantity: dto.quantity,
                categoryId: dto.categoryId,
                notes: dto.notes
            }
        })
    }

    async update(dto: any) {
        return await this.dbContext.product.update({
            where: { id: parseInt(dto.id) }, data: {
                price: dto.price,
                price_unit: dto.price_unit,
                product_description: dto.product_description,
                product_name: dto.product_name,
                quantity: dto.quantity,
                categoryId: dto.categoryId,
                notes: dto.notes
            }
        })
    }

    async delete(id: string) {
        return await this.dbContext.product.delete({ where: { id: parseInt(id) } })
    }
}
