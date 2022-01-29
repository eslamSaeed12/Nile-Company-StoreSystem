import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Account } from "./Account";
import { Order } from "./Order";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    customer_name!: string;

    @Column()
    customer_addresse!: string;

    @Column()
    customer_phoneNumber!: string;

    @Column()
    isProvider!: boolean;

    @Column({ nullable: true })
    notes!: string;  //   

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(type => Account)
    @JoinColumn()
    account!: Account;

    @OneToMany(type => Order, o => o?.customer)
    orders?: Order[]

}