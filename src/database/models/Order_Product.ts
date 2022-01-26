import { Column, Entity, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";


@Entity('Order_Product')
export class Order_Product {

    @Column()
    quantity!: number;

    @Column({ primary: true })
    orderId!: number;

    @Column({ primary: true })
    productId!: number;

    @ManyToOne(() => Product, o => o.orders, { eager: true, cascade: true })
    product!: Product

    @ManyToOne(() => Order, o => o.products, { eager: true, cascade: true })
    order!: Order

}