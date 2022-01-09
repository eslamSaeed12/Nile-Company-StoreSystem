import { injectable } from "tsyringe";
import { Connection, getRepository, Repository } from "typeorm";
import { Category } from "../database/models/Category";
@injectable()
export class categoryService {

    private dbContext: Repository<Category>;

    constructor(db:Connection) {
        this.dbContext = db.getRepository(Category)
    }

    async All() {
        return await this.dbContext.find();
    }


    async count() {
        return await this.dbContext.count();
    }


    async find(id: string) {
        return await this.dbContext.findOneOrFail(id);
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
}
