import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";
import { Role } from "../models/Role";
import { User } from "../models/User";

export default class CreateUsers implements Seeder {
    public async run(factory: any, connection: Connection): Promise<any> {
        const repo = connection.getRepository(User);

        const res = await repo.upsert([
            {
                username: 'ADMIN',
                password: 'ADMIN',
                role: await connection.getRepository(Role).findOne({ where: { title: 'admin' } }),
            },
            {
                username: 'super',
                password: 'super',
                role: await connection.getRepository(Role).findOne({ where: { title: 'superuser' } }),

            }
        ], ['username']);

    }
}