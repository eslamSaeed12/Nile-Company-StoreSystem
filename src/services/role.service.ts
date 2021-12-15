import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { PgConnection } from "../database/connections/pg.con";


@injectable()
export class roleService {

  private dbContext: PrismaClient;


  constructor(provider: PgConnection) {
    this.dbContext = provider.getConnection();
  }


  async All() {
    return await this.dbContext.role.findMany();
  }


  async count() {
    return await this.dbContext.role.count();
  }


  async find(id: string) {
    return await this.dbContext.role.findFirst({ where: { id: parseInt(id) } })
  }

  async insert(dto: any) {
    return await this.dbContext.role.create({
      data: {
        title: dto.title
      }
    })
  }

  async update(dto: any) {
    return await this.dbContext.role.update({
      where: { id: parseInt(dto.id) }, data: {
        title: dto.title
      }
    })
  }

  async delete(id: string) {
    return await this.dbContext.role.delete({ where: { id: parseInt(id) } })
  }
}
