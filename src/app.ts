import "reflect-metadata";
import "./ioc/ioc.providers";
import { Factory } from "./modules/AppFactory";
import { server } from "./server";
import { config as envInializer } from "dotenv";
import "./modules/events";
import { Logger } from "./utils/Logger";
import { Connection, createConnection } from 'typeorm'
import { container } from "tsyringe";


class NileStoreWebApp {
  public static async main() {
    // environment variables parser from .env file [development only]
    envInializer();

    // OPEN DB CONNECTION
    const db = await createConnection();

    container.register<Connection>(Connection, { useValue: db });

    Logger.log("Database connected successfully");

    // build application instance
    const app = Factory.construct(server);


    // run the server
    app.serve();
  }
}

NileStoreWebApp.main().catch((err) => {
  Logger.error(err);
  process.exit(1);
}).finally(async () => {
});

process.on("uncaughtException", (err) => {
  Logger.error(err);
  process.exit(1);
});

