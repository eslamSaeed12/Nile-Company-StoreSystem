import { injectable } from "tsyringe";
import { Connection, Repository } from "typeorm";
import { Account } from "../database/models/Account";
import _ from 'lodash'
@injectable()
export class FinancialService {

    private dbContext: Repository<Account>;

    constructor(private con: Connection) {
        this.dbContext = con.getRepository(Account);
    }

    all() {
        return this.dbContext.find({ relations: ['customer'] });
    }

    find(accountId: number) {
        return this.dbContext.findOneOrFail(accountId, { relations: ['customer'] });
    }

    create() {
        return this.dbContext.save(this.dbContext.create());
    }

    update(dto: any) {
        return this.dbContext.update(dto.id, { ...(_.omit(dto, 'id')) })
    }


    delete(id: number) {
        return this.dbContext.delete(id);
    }

    async decreaseDebt(id: number, paid: number) {
        const tmp = await this.dbContext.findOneOrFail(id);
        return this.dbContext.update(id, { debt: tmp.debt > 0 ? tmp.debt - paid : paid })
    }

    async increaseDebt(id: number, cost: number) {
        const tmp = await this.dbContext.findOneOrFail(id);
        return this.dbContext.update(id, { debt: tmp.debt > 0 ? tmp.debt + cost : cost })
    }

}