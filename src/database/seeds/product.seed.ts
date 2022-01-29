import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Category } from "../models/Category";
import { Product } from "../models/Product";

// create-pets.seed.ts
export default class CreateProducts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const cats = await factory(Category)().createMany(5);
        await factory(Product)({ categories: cats }).createMany(25);
    }
}