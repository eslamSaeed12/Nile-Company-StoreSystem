import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Supplier {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    Supplier_name!: string;

    @Column()
    Supplier_company!: string;

    @Column()
    supplier_addresse!: string;

    @Column()
    supplier_phoneNumber!: string;

    @Column({ nullable: true })
    notes!: string;  //   

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(type => Order, o => o.supplier)
    suppliedOrders!: Order[]

}