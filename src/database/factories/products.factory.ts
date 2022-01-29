import { define, factory } from "typeorm-seeding"
import { Product } from "../models/Product"
import faker from 'casual'
import { Category } from "../models/Category";


define(Product, (fakers, context: any) => {
    const p = new Product();
    p.price = faker.integer(1, 32);
    p.product_description = faker._sentence();
    p.product_name = faker._title();
    p.quantity = faker.integer(50, 5000);
    p.category = context?.categories?.[faker.integer(0, context.categories?.length - 1)];
    return p;
})