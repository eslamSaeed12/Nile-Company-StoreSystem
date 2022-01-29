import { injectable } from "tsyringe";
import { Connection, Repository } from "typeorm";
import { Product } from "../database/models/Product";
import { IsUniqueButNotMe } from "../utils/AlterUnique";

@injectable()
export class productService {

    private dbContext: Repository<Product>;

    constructor(db: Connection) {
        this.dbContext = db.getRepository(Product)
    }


    async All() {
        return await this.dbContext.find({ relations: ['category'] });
    }

    async count() {
        return await this.dbContext.count();
    }


    async find(id: string) {
        return await this.dbContext.findOneOrFail(id, { relations: ['category'] });
    }

    async insert(dto: any) {
        const created = this.dbContext.create({
            product_name: dto.product_name,
            price: dto.price,
            product_description: dto.product_description,
            quantity: dto.quantity,
            category: {
                id: dto.categoryId
            },
            notes: dto.notes
        });

        return await this.dbContext.save(created);
    }

    async update(dto: any) {
        return await this.dbContext.update(dto.id, {
            price: dto.price,
            product_description: dto.product_description,
            product_name: dto.product_name,
            quantity: dto.quantity,
            category: {
                id: dto.categoryId
            },
            notes: dto.notes
        })
    }

    async delete(id: string) {
        return await this.dbContext.delete(id)
    }


    async checkProductName(product_name: string) {
        return await this.dbContext.findOne({ product_name });
    }


    async isUniqueButNotMe(id: string, fieldValue: any) {
        return IsUniqueButNotMe(this.dbContext.createQueryBuilder('Product'), id, 'product_name', fieldValue);
    }
}
