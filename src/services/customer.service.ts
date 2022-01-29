import { injectable } from "tsyringe";
import { createCustomer, updateCustomer } from "../http/dtos/customer.dto";
import { Connection, getRepository, Repository } from "typeorm";
import { Customer } from "../database/models/Customer";
import { IsUniqueButNotMe } from "../utils/AlterUnique";
import { FinancialService } from "./financial.service";

@injectable()
export class customerService {


    private dbContext: Repository<Customer>;

    constructor(private db: Connection, private accountService: FinancialService) {
        this.dbContext = db.getRepository(Customer);

    }

    async All() {
        return await this.dbContext.find();
    }

    async count() {
        return await this.dbContext.count();
    }

    async find(id: string) {
        return await this.dbContext.findOneOrFail(id, { relations: ['account'] });
    }

    async insert(dto: createCustomer) {
        const newAccount = await this.accountService.create();
        return await this.dbContext.insert({ ...dto, account: newAccount })
    }

    async update(dto: updateCustomer) {
        return await this.dbContext.update(dto.id, {
            customer_addresse: dto.customer_addresse,
            customer_name: dto.customer_name,
            customer_phoneNumber: dto.customer_phoneNumber,
            isProvider: dto.isProvider,
            notes: dto.notes
        })
    }

    async delete(id: string) {
        return await this.dbContext.delete(id);
    }



    async isUniqueButNotMe(id: string, fieldValue: any) {
        return IsUniqueButNotMe(this.dbContext.createQueryBuilder('Customer'), id, 'customer_name', fieldValue);
    }


    async findByName(customer_name: string) {
        return await this.dbContext.createQueryBuilder('Customer').where('customer_name = :name', { name: customer_name }).execute()
    }
}
