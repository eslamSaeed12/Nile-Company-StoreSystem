import { injectable } from "tsyringe";
import { createCustomer, updateCustomer } from "../http/dtos/customer.dto";
import { Connection, getRepository, Repository } from "typeorm";
import { Customer } from "../database/models/Customer";

@injectable()
export class customerService {


    private dbContext: Repository<Customer>;

    constructor(private db:Connection) {
        this.dbContext = db.getRepository(Customer);
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

    async insert(dto: createCustomer) {

        return await this.dbContext.insert(dto)
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
}
