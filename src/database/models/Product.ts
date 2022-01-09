import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";
import { Order } from "./Order";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    product_name!: string;

    @Column()
    product_description!: string;// String

    @Column()
    quantity!: number;

    @Column()
    price!: number; //               Float

    @Column()
    price_unit!: string; //          String

    @Column({ nullable: true })
    notes!: string;  //              String?

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(type => Category, c => c.products)
    category!: Category;

    // many to many orders
    @ManyToMany(() => Order, o => o.products)
    orders?: Order[]
}