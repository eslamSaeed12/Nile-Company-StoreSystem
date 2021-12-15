import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class PgConnection {
  private connection!: PrismaClient;
  getConnection() {
    if (!this.connection) {
      this.connection = new PrismaClient();
    }
    return this.connection;
  }
}
