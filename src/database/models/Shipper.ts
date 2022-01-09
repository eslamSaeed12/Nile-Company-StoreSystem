import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Shipper {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    shipper_name!: string;

    @Column({})
    shipper_addresse!: string;

    @Column({})
    shipper_phoneNumber!: string;

    @Column({ nullable: true })
    notes!: string;  //   

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(type=> Order , o=>o?.shipper)
    orders?:Order[]

}