import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcryptjs";
import { Logger } from "../../utils/Logger";

const client = new PrismaClient();

async function seed() {

    if (!process.env["SUPER_ROLE"]) {
        throw new Error("SUPER_ROLE SHOULD BE IN ENVIRONEMNT VARIABLES")
    }

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


    if (!process.env["SUPER_USERNAME"] || !process.env["SUPER_PASSWORD"]) {
        throw new Error("SUPER_USERNAME AND SUPER_PASSWORD SHOULD BE IN ENVIRONEMNT VARIABLES")
    }

    const superUser = await client.user.upsert({
        where: {
            username: process.env["SUPER_USERNAME"],
        },
        create: {
            username: <string>process.env["SUPER_USERNAME"],
            password: hashSync(<string>process.env["SUPER_PASSWORD"]),
            roleId: superUserRole.id
        },
        update: {
            username: <string>process.env["SUPER_USERNAME"],
            password: hashSync(<string>process.env["SUPER_PASSWORD"]),
        }
    })
}


seed().then(() => Logger.success("database seed done successfully")).catch(err => {
    Logger.error(err)
}).finally(async () => {
    await client.$disconnect()
})