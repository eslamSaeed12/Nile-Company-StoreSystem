import { hashSync } from "bcryptjs";
import { injectable } from "tsyringe";
import { Connection, getRepository, Repository } from "typeorm";
import { User } from "../database/models/User";
import { updateUser } from "../http/dtos/user.dto";
import { IsUniqueButNotMe } from "../utils/AlterUnique";
@injectable()
export class userService {

  private dbContext: Repository<User>;


  constructor(db: Connection) {
    this.dbContext = db.getRepository(User);
  }


  async All() {
    return await this.dbContext.find({ relations: ['role'] });
  }

  async find(id: string) {
    return await this.dbContext.findOneOrFail(id, { relations: ['role'] });
  }

  async findByUsername(username: string) {
    return await this.dbContext.findOne({
      where: {
        username
      }, relations: ['role']
    })
  }

  async insert(dto: any) {
    return await this.dbContext.insert({
      username: dto.username,
      password: dto.password,
      role: {
        id: dto.roleId
      }
    })
  }

  async update(dto: updateUser) {
    return await this.dbContext.update(dto.id, {
      role: {
        id: dto.roleId
      },
      username: dto.username,
      password: dto.newPassword ? hashSync(dto.newPassword) : dto.password,
    })
  }

  async delete(id: string) {
    return await this.dbContext.delete(id)
  }

  async count() {
    return await this.dbContext.count()
  }


  async isUniqueButNotMe(id: string, fieldValue: any) {
    return IsUniqueButNotMe(this.dbContext.createQueryBuilder('User'), id, 'username', fieldValue);
  }


  async findByName(username: string) {
    return await this.dbContext.createQueryBuilder('User').where('username = :name', { name: username }).execute()
  }

}
