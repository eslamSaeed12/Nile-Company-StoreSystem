import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";
import { Role } from "../models/Role";

export default class CreateRoles implements Seeder {
    public async run(factory: any, connection: Connection): Promise<any> {
        await connection.getRepository(Role).upsert([
            { title: 'admin' }, { title: 'superuser' }
        ], ['title']);
    }
}