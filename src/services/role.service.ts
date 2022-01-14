import { injectable } from "tsyringe";
import { Connection, getRepository, Repository } from "typeorm";
import { Role } from "../database/models/Role";
import { IsUniqueButNotMe } from "../utils/AlterUnique";


@injectable()
export class roleService {

  private dbContext: Repository<Role>;


  constructor(db: Connection) {
    this.dbContext = db.getRepository(Role);
  }


  async All() {
    return await this.dbContext.find();
  }


  async count() {
    return await this.dbContext.count();
  }


  async find(id: string) {
    return await this.dbContext.findOneOrFail(id)
  }

  async insert(dto: any) {
    return await this.dbContext.insert({
      title: dto.title
    })
  }

  async update(dto: any) {
    return await this.dbContext.update(dto.id, {
      title: dto.title
    })
  }

  async delete(id: string) {
    return await this.dbContext.delete(id);
  }

  async findByName(title: string) {
    return await this.dbContext.createQueryBuilder().where('title = :name', { name: title }).execute()
  }

  async isUniqueButNotMe(id: string, fieldValue: any) {
    return IsUniqueButNotMe(this.dbContext.createQueryBuilder('Role'), id, 'title', fieldValue);
  }
}
