import { hashSync } from "bcryptjs";
import { injectable } from "tsyringe";
import { Connection, getRepository, Repository } from "typeorm";
import { User } from "../database/models/User";
@injectable()
export class userService {

  private dbContext: Repository<User>;


  constructor(db:Connection) {
    this.dbContext = db.getRepository(User);
  }


  async All() {
    return await this.dbContext.find();
  }

  async find(id: string) {
    return await this.dbContext.findOne(id)
  }

  async findByUsername(username: string) {
    return await this.dbContext.findOneOrFail({ username })
  }

  async insert(dto: any) {
    return await this.dbContext.insert({
      username: dto.username,
      password: hashSync(dto.password),
      role: {
        id: dto.roleId
      }
    })
  }

  async update(dto: any, passwordUpdated: boolean) {
    return await this.dbContext.update(dto.id, {
      role: {
        id: dto.roleId
      },
      username: dto.username,
      password: passwordUpdated ? hashSync(dto.password) : dto.password
    })
  }

  async delete(id: string) {
    return await this.dbContext.delete(id)
  }

  async count() {
    return await this.dbContext.count()
  }

}
