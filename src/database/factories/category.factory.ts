import { define } from "typeorm-seeding"
import faker from 'casual'
import { Category } from "../models/Category";

define(Category, (fakers) => {
    const C = new Category();
    C.title = faker._title();
    return C;
})