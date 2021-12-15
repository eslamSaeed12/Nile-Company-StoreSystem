import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { PgConnection } from "../database/connections/pg.con";

@injectable()
export class orderService {


    private dbContext: PrismaClient;

    constructor(provider: PgConnection) {
        this.dbContext = provider.getConnection();
    }


    async All() {
        return await this.dbContext.order.findMany();
    }

    async count() {
        return await this.dbContext.order.count();
    }


    async find(id: string) {
        return await this.dbContext.order.findFirst({ where: { id: parseInt(id) } })
    }

    async insert(dto: any) {
        let order = await this.dbContext.order.create({
            data: {
                customerId: dto.customerId,
                shipperId: dto.shipperId,
                notes: dto.notes,
                paindUnit: dto.paidUnit,
                price: dto.price,
                total: dto.total,
                quantity: dto.quantity,
                supplierId: dto.supplierId,
            },
            include: {
                Customer: true,
                Shipper: true,
                Supplier: true,
                products: true
            }
        });

        let mappedOrderProducts = dto.products.map((p: number) => ({ productId: p, orderId: order.id }));

        await this.dbContext.productsOnOrders.createMany({ data: mappedOrderProducts });

        return order;
    }

    async update(dto: any) {
        return await this.dbContext.order.update({
            where: { id: parseInt(dto.id) }, data: {
                customerId: dto.customerId,
                shipperId: dto.shipperId,
                notes: dto.notes,
                paindUnit: dto.paidUnit,
                price: dto.price,
                total: dto.total,
                quantity: dto.quantity,
                supplierId: dto.supplierId,
            }
        });
    }

    async removeProduct(dto: any) {
        return await this.dbContext.productsOnOrders.delete({
            where: {
                productId_orderId: {
                    orderId: dto.orderId,
                    productId: dto.productId
                }
            }
        });
    }

    async addProduct(dto: any) {
        return await this.dbContext.productsOnOrders.create({
            data: {
                orderId: dto.orderId,
                productId: dto.productId
            }
        });
    }

    async delete(id: string) {
        return await this.dbContext.order.delete({ where: { id: parseInt(id) } })
    }
}
