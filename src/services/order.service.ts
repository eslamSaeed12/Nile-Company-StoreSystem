import { injectable } from "tsyringe";
import { Connection, Repository } from "typeorm";
import { Order } from "../database/models/Order";
import { Order_Product } from "../database/models/Order_Product";
import _ from 'lodash'
import { Account } from "../database/models/Account";
import { FinancialService } from "./financial.service";
import { customerService } from "./customer.service";
import { Product } from "../database/models/Product";
@injectable()
export class orderService {


    private OrderCtx: Repository<Order>;
    private OrderPrdctCtx: Repository<Order_Product>;
    constructor(private db: Connection, private accountService: FinancialService, private CustomerService: customerService) {
        this.OrderCtx = db.getRepository(Order);
        this.OrderPrdctCtx = db.getRepository(Order_Product);
    }


    async All() {
        return await this.OrderCtx.find({ relations: ['shipper', 'supplier', 'customer', 'products'] });
    }

    async count() {
        return await this.OrderCtx.count();
    }


    async find(id: string) {
        return await this.OrderCtx.findOneOrFail(id, { relations: ['shipper', 'supplier', 'customer', 'products'] });
    }

    async insert(dto: any) {

        const cost = await this.calculateOrderCost(dto.products) - parseInt(dto.discount);

        const customer_ = await this.CustomerService.find(dto.customerId);

        await this.accountService.increaseDebt(customer_.account.id, cost);

        let order = this.OrderCtx.create({
            customer: {
                id: dto.customerId
            },
            shipper: {
                id: dto.shipperId
            },
            supplier: {
                id: dto.supplierId
            },
            notes: dto.notes,
            cost: cost,
            discount: dto.discount,
            state: dto.state,
        });


        // save new order
        await this.OrderCtx.save(order);

        const mappedProds = dto.products.map((p: any) => ({ ...p, orderId: order.id }))

        // create order products
        const prods = this.OrderPrdctCtx.create(mappedProds);

        // save order products
        let products = await this.OrderPrdctCtx.save(prods);


        return { ...order, products };
    }

    async update(dto: any) {

        const thisOrder = await this.find(dto.id);

        const oldCost = thisOrder.cost;

        await this.accountService.decreaseDebt(dto.customerId, oldCost);

        const newCost = await this.calculateOrderCost(dto.products) - dto.discount;

        await this.accountService.increaseDebt(dto.customerId, newCost);

        await this.OrderCtx.update(dto.id, {
            customer: {
                id: dto.customerId
            },
            shipper: {
                id: dto.shipperId
            },
            supplier: {
                id: dto.supplierId
            },
            notes: dto.notes,
            cost: newCost,
            discount: dto.discount,
            state: dto.state,
        });

        let _result_ = await this.syncOrderProducts(dto.id, dto.products)

        return _result_;

    }

    async syncOrderProducts(orderId: number, products_: Array<any>) {


        if (!products_.length) {
            return await this.OrderPrdctCtx.createQueryBuilder().
                delete().
                from(Order_Product)
                .where('orderId = :orderId', { orderId })
                .execute()
        }


        const stringfiedProds = products_.map((p: any) => (p.productId)).join(',');

        await this.OrderPrdctCtx.createQueryBuilder().delete().from(Order_Product).where('orderId = :orderId', { orderId }).andWhere(`productId NOT IN(${stringfiedProds})`).execute();

        const mappedReqProds = products_.map((p) => ({ ...p, orderId }));

        const syncingNewProds = await this.OrderPrdctCtx.upsert(mappedReqProds, ['orderId', 'productId']);

        return syncingNewProds;
    }

    async delete(id: string) {
        const thisOrder = await this.find(id);
        const cost = thisOrder.cost;
        const customerId = thisOrder.customer?.id as any;
        await this.accountService.decreaseDebt(customerId, cost);
        await this.OrderPrdctCtx.delete({ orderId: Number(id) });
        return await this.OrderCtx.delete(id);
    }


    async calculateProductCost(productId: number, quantity: number) {
        const query = `select (price * ${quantity}) as cost_ from product where product."id" = '${productId}'`;
        console.log(await this.db.query(query))
        return (await this.db.query(query))[0];
    }


    async calculateOrderCost(products: Array<{ productId: number, quantity: number }>) {
        let totalCost = 0;

        for (let i = 0; i < products.length; i++) {
            console.log(products[i].productId, products[i].quantity)
            let cost = (await this.calculateProductCost(products[i].productId, products[i].quantity))?.cost_;
            totalCost += cost;
        }

        return totalCost;
    }

}
