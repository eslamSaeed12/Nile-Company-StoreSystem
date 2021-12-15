import { PrismaClient } from "@prisma/client"
import { Logger } from "../../utils/Logger";

const client = new PrismaClient();

async function seed() {

    const superUserRole = await client.role.upsert({
        where: {
            title: process.env["SUPER_ROLE"]
        },
        create: {
            title: <string>process.env["SUPER_ROLE"]
        },
        update: {
            title: process.env["SUPER_ROLE"]
        }
    })

    const superUser = await client.user.upsert({
        where: {
            username: process.env["SUPER_USERNAME"],
        },
        create: {
            username: <string>process.env["SUPER_USERNAME"],
            password: <string>process.env["SUPER_PASSWORD"],
            roleId: superUserRole.id
        },
        update: {
            username: <string>process.env["SUPER_USERNAME"],
            password: <string>process.env["SUPER_PASSWORD"],
        }
    })
}


seed().then(() => Logger.success("database seed done successfully")).catch(err => {
    Logger.error(err)
}).finally(async () => {
    await client.$disconnect()
})