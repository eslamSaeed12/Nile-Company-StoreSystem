import { injectable } from "tsyringe";
import { Connection, EntityManager, getRepository, Repository } from "typeorm";
import { Order } from "../database/models/Order";
import { Order_Product } from "../database/models/Order_Product";
import _ from 'lodash'
@injectable()
export class orderService {


    private OrderCtx: Repository<Order>;
    private OrderPrdctCtx: Repository<Order_Product>;
    private mgr!: EntityManager;

    constructor(db: Connection) {
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
            paindUnit: dto.paidUnit,
            paid: dto.paid,
            total_price: dto.total_price,
            state: dto.state,
        });


        // save new order
        await this.OrderCtx.save(order);

        const mappedProds = dto.products.map((p: any) => ({ ...p, orderId: order.id }))

        // create order products
        const prods = this.OrderPrdctCtx.create(mappedProds);

        // save order products
        let products = await this.OrderPrdctCtx.save(prods, { reload: true });


        return { ...order, products };
    }

    async update(dto: any) {

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
            paindUnit: dto.paidUnit,
            paid: dto.paid,
            total_price: dto.total_price,
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
        return await this.OrderCtx.delete(id)
    }

}
