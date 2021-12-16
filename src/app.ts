import "reflect-metadata";
import "./ioc/ioc.providers";
import { Factory } from "./modules/AppFactory";
import { server } from "./server";
import { config as envInializer } from "dotenv";
import "./modules/events";
import { Logger } from "./utils/Logger";
import { PgConnection } from "./database/connections/pg.con";

class NileStoreWebApp {
  public static async main() {
    // environment variables parser from .env file [development only]
    envInializer();

    // build application instance
    const PgDb = Factory.construct(PgConnection);

    // build application instance
    const app = Factory.construct(server);

    // connect the mongo db
    await PgDb.getConnection().$connect();

    Logger.log("Database connected successfully");
    // run the server
    app.serve();
  }
}

NileStoreWebApp.main().catch((err) => {
  Logger.error(err);
  process.exit(1);
}).finally(async () => {
  await Factory.construct(PgConnection).getConnection().$disconnect()
});

process.on("uncaughtException", (err) => {
  Logger.error(err);
  process.exit(1);
});
