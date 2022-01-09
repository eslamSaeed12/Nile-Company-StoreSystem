import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";
import { Role } from "../models/Role";
import { User } from "../models/User";

export default class CreatePets implements Seeder {
    public async run(factory: any, connection: Connection): Promise<any> {
        const roles = await connection.getRepository(Role).find();

        await connection.getRepository(User).upsert([
            {
                username: 'ADMIN',
                password: 'ADMIN',
                role: await connection.getRepository(Role).findOne({ where: { title: 'admin' } }),
            },
            {
                username: 'super',
                password: 'super',
                role: await connection.getRepository(Role).findOne({ where: { title: 'superuser' } })

            }
        ], ['username'])
    }
}