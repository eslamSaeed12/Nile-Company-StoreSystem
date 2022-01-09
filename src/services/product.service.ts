import { injectable } from "tsyringe";
import { Connection, getRepository, Repository } from "typeorm";
import { Product } from "../database/models/Product";

@injectable()
export class productService {

    private dbContext: Repository<Product>;

    constructor(db:Connection) {
        this.dbContext = db.getRepository(Product)
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
            product_name: dto.product_name,
            price: dto.price,
            price_unit: dto.price_unit,
            product_description: dto.product_description,
            quantity: dto.quantity,
            category: {
                id: dto.categoryId
            },
            notes: dto.notes,
        })
    }

    async update(dto: any) {
        return await this.dbContext.update(dto.id, {
            price: dto.price,
            price_unit: dto.price_unit,
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
        return await this.dbContext.findAndCount({ product_name });
    }
}
