import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    title!: string;


    @Column({ nullable: true })
    notes!: string;  //              String?


    @CreateDateColumn()
    createdAt!: Date;


    @OneToMany(type => Product, p => p.category)
    products!: Array<Product>;

}