import { injectable } from "tsyringe";
import { Connection, getRepository, Repository } from "typeorm";
import { Order } from "../database/models/Order";
import { IsUniqueButNotMe } from "../utils/AlterUnique";

@injectable()
export class orderService {


    private dbContext: Repository<Order>;

    constructor(db: Connection) {
        this.dbContext = db.getRepository(Order);
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

    async insert(dto: any) {
        let order = await this.dbContext.insert({
            customer: {
                id: dto.customerId
            },
            shipper: {
                id: dto.shipperId
            },
            notes: dto.notes,
            paindUnit: dto.paidUnit,
            price: dto.price,
            total: dto.total,
            quantity: dto.quantity,
            supplier: {
                id: dto.supplierId
            },
        });

        //let mappedOrderProducts = dto.products.map((p: number) => ({ productId: p, orderId: order.id }));

        //await this.dbContext.productsOnOrders.createMany({ data: mappedOrderProducts });

        return order;
    }

    async update(dto: any) {
        return await this.dbContext.update(dto.id, {
            customer: {
                id: dto.customerId
            },
            shipper: {
                id: dto.shipperId
            },
            notes: dto.notes,
            paindUnit: dto.paidUnit,
            price: dto.price,
            total: dto.total,
            quantity: dto.quantity,
            supplier: {
                id: dto.supplierId
            },
        });
    }

    async removeProduct(dto: any) {
        /*return await this.dbContext.productsOnOrders.delete({
            where: {
                productId_orderId: {
                    orderId: dto.orderId,
                    productId: dto.productId
                }
            }
        });*/
    }

    async addProduct(dto: any) {
        /*  return await this.dbContext.productsOnOrders.create({
              data: {
                  orderId: dto.orderId,
                  productId: dto.productId
              }
          });*/
    }

    async delete(id: string) {
        return await this.dbContext.delete(id)
    }

}
