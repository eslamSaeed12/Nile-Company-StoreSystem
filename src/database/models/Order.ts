import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";
import { Shipper } from "./Shipper";
import { Supplier } from "./Supplier";


export enum ORDER_STATE {
    PENDING,
    FAIL,
    CANCELED,
    DONE,
}

export enum PAID_UNIT {
    EGP
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ enum: ORDER_STATE })
    state!: ORDER_STATE;

    @Column({})
    quantity!: number;

    @Column({})
    price!: number;

    @Column({})
    total!: number;

    @Column({ enum: PAID_UNIT })
    paindUnit!: PAID_UNIT;


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

    // many to many orders
    @ManyToMany(() => Product, o => o.orders)
    @JoinTable()
    products?: Product[]

}