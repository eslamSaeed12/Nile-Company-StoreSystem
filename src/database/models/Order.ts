import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from "typeorm";
import { Customer } from "./Customer";
import { Order_Product } from "./Order_Product";
import { Shipper } from "./Shipper";
import { Supplier } from "./Supplier";


export enum ORDER_STATE {
    PENDING,
    FAIL,
    CANCELED,
    DONE,
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ enum: ORDER_STATE })
    state!: ORDER_STATE;

    // percent
    @Column('decimal')
    discount!: number;

    @Column('decimal')
    cost!: number;

    @Column({ nullable: true })
    notes!: string;  //   

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(type => Supplier, s => s.suppliedOrders)
    supplier?: Supplier

    @ManyToOne(type => Shipper, s => s?.orders)
    shipper?: Shipper

    @ManyToOne(type => Customer, s => s?.orders)
    customer?: Customer

    @OneToMany(type => Order_Product, p => p.order)
    products!: Order_Product[];

}