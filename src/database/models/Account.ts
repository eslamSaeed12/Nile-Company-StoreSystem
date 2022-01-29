import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";


@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(type => Customer, c => c.account, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    customer!: Customer;

    @Column({ type: 'decimal', default: 0 })
    debt!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}