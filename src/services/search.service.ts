import { injectable } from "tsyringe";
import { Connection, Repository } from "typeorm";
import { Category } from "../database/models/Category";
import { Customer } from "../database/models/Customer";
import { Product } from "../database/models/Product";
import { Role } from "../database/models/Role";
import { Shipper } from "../database/models/Shipper";
import { Supplier } from "../database/models/Supplier";
import { User } from "../database/models/User";



@injectable()
export class searchService {

    private customerRepo!: Repository<Customer>;
    private productRepo!: Repository<Product>;
    private categoryRepo!: Repository<Category>;
    private shipperRepo!: Repository<Shipper>;
    private supplierRepo!: Repository<Supplier>;
    private userRepo!: Repository<User>;
    private roleRepo!: Repository<Role>;

    constructor(private con: Connection) {
        this.categoryRepo = con.getRepository(Category);
        this.customerRepo = con.getRepository(Customer);
        this.productRepo = con.getRepository(Product);
        this.shipperRepo = con.getRepository(Shipper);
        this.userRepo = con.getRepository(User);
        this.roleRepo = con.getRepository(Role);
        this.supplierRepo = con.getRepository(Supplier);
    }


    async search(text: string) {

        let categories = await this.categoryRepo.query(`select * from category where category."title" LIKE '%${text}%'`);

        let products = await this.productRepo.query(`select * from product where product_name LIKE '%${text}%'`);

        let shippers = await this.shipperRepo.query(`select * from shipper where shipper_name LIKE '%${text}%' `);

        let customers = await this.customerRepo.query(`select * from customer where customer_name LIKE '%${text}%'`);

        let users = await this.userRepo.createQueryBuilder('user').where(`username LIKE '%${text}%'`).getMany();

        let roles = await this.roleRepo.query(`select * from role where title LIKE '%${text}%' `)

        let suppliers = await this.supplierRepo.query(`select * from supplier where "supplier"."Supplier_name" LIKE '%${text}%' `);


        return { categories, products, shippers, customers, roles, suppliers, users }
    }
}