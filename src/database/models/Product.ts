import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Category } from "./Category";
import { Order_Product } from "./Order_Product";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    product_name!: string;

    @Column()
    product_description!: string;// String

    @Column({ type: 'float' })
    quantity!: number;

    @Column({ type: 'float' })
    price!: number; //               Float

    @Column({ default: 'جم', nullable: true })
    price_unit!: string; //          String

    @Column({ nullable: true })
    notes!: string;  //              String?

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(type => Category, c => c.products)
    category!: Category;

    @OneToMany(type => Order_Product, o => o.product)
    orders!: Order_Product[];
}