import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { injectable } from "tsyringe";
import { PgConnection } from "../database/connections/pg.con";

@injectable()
export class userService {

  private dbContext: PrismaClient;


  constructor(provider: PgConnection) {
    this.dbContext = provider.getConnection();
  }


  async All() {
    return await this.dbContext.user.findMany({ include: { role: true } });
  }

  async find(id: string) {
    return await this.dbContext.user.findFirst({ where: { id: parseInt(id) }, include: { role: true } })
  }

  async findByUsername(username: string) {
    return await this.dbContext.user.findFirst({ where: { username } })
  }

  async insert(dto: any) {
    return await this.dbContext.user.create({
      data: {
        username: dto.username,
        password: hashSync(dto.password),
        roleId: 1, //  default user ,
      }
    })
  }

  async update(dto: any, passwordUpdated: boolean) {
    return await this.dbContext.user.update({
      where: {
        id: parseInt(dto.id)
      },
      data: {
        roleId: dto.roleId,
        username: dto.username,
        password: passwordUpdated ? hashSync(dto.password) : dto.password
      }
    })
  }

  async delete(id: string) {
    return await this.dbContext.user.delete({ where: { id: parseInt(id) } })
  }

  async count() {
    return await this.dbContext.user.count()
  }

}
