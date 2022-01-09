import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    title!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(type => User, u => u.role)
    users!: User[]
}