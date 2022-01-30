import { injectable } from "tsyringe";
import { Connection, Repository } from "typeorm";
import { Order } from "../database/models/Order";
@injectable()
export class debtsService {

    dbContext!: Repository<Order>;

    constructor(private db: Connection) {
        this.dbContext = db.getRepository(Order);

    }

    async debts() {
        const co_name = process.env['COMPANY_NAME'];

        const res = await this.db.createQueryBuilder()
            .from('customer', 'c')
            .select('c.id')
            .where('c.customer_name = :n', { n: co_name })
            .getOne() as any;

        const result = await this.dbContext.createQueryBuilder('order')
            .leftJoin('order.customer', 'customer')
            .select(['order.id', 'customer.customer_name', 'cost', 'paid', 'order.updatedAt'])
            .where('order.customerId = :id', { id: res.id })
            .andWhere('order.cost != order.paid')
            .execute();

        return result;
    }

    async funds() {

        const co_name = process.env['COMPANY_NAME'];

        const res = await this.db.createQueryBuilder()
            .from('supplier', 's')
            .select('s.id')
            .where('s.Supplier_name = :n', { n: co_name })
            .getOne() as any;

        const result = await this.dbContext.createQueryBuilder('order')
            .leftJoin('order.supplier', 'supplier')
            .select(['order.id', 'supplier.Supplier_name', 'cost', 'paid', 'order.updatedAt'])
            .where('order.supplierId = :id', { id: res.id })
            .andWhere('order.cost != order.paid')
            .execute();



        return result;
    }


    async paidAdebt(orderId: number, paid: number) {
        return this.dbContext.update(orderId, {
            paid
        })
    }

}
