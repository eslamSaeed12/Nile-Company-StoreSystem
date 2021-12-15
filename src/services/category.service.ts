import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { PgConnection } from "../database/connections/pg.con";
@injectable()
export class categoryService {

    private dbContext: PrismaClient;

    constructor(provider: PgConnection) {
        this.dbContext = provider.getConnection();
    }

    async All() {
        return await this.dbContext.category.findMany();
    }


    async count() {
        return await this.dbContext.category.count();
    }


    async find(id: string) {
        return await this.dbContext.category.findFirst({ where: { id: parseInt(id) } })
    }

    async insert(dto: any) {
        return await this.dbContext.category.create({
            data: {
                title: dto.title,
            }
        })
    }

    async update(dto: any) {
        return await this.dbContext.category.update({
            where: { id: dto.id }, data: {
                title: dto.title
            }
        })
    }

    async delete(id: string) {
        return await this.dbContext.category.delete({ where: { id: parseInt(id) } });
    }
}
