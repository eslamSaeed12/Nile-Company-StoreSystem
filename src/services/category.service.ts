import { injectable } from "tsyringe";
import { Connection, Repository } from "typeorm";
import { Category } from "../database/models/Category";
import { IsUniqueButNotMe } from "../utils/AlterUnique";
@injectable()
export class categoryService {

    private dbContext: Repository<Category>;

    constructor(db: Connection) {
        this.dbContext = db.getRepository(Category)
    }

    async All() {
        return await this.dbContext.find({});
    }


    async count() {
        return await this.dbContext.count();
    }


    async find(id: string) {
        return await this.dbContext.findOneOrFail(id, { loadEagerRelations: true });
    }

    async insert(dto: any) {
        return await this.dbContext.insert({
            title: dto.title,
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


    async isUniqueButNotMe(id: string, fieldValue: any) {
        return IsUniqueButNotMe(this.dbContext.createQueryBuilder('Category'), id, 'title', fieldValue);
    }

    async findByName(title: string) {
        return await this.dbContext.createQueryBuilder('role').where('title = :name', { name: title }).execute()
    }

}
