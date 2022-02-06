import express from "express";
import helmet from "helmet";
import { container, injectAll, singleton } from "tsyringe";
import { join } from "path";
import cors from "cors";
import os from "os";
import { IRouter, Router_ } from "./modules/IRouter";
import Limiter from "express-rate-limit";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import morgan from "morgan";
import bodyParser from "body-parser";
import compress from "compression";
import hpp from "hpp";
import { Logger } from "./utils/Logger";
import timeout from "connect-timeout";
import { filter } from "./modules/IMiddleware";
import { Context } from "./modules/ctxHook";
const isDev = process.env.NODE_ENV !== "production";
const listRoutes = require("express-list-routes");


@singleton()
export class server {
  private server!: express.Application;

  constructor(
    @injectAll(Router_.token) private routers: Array<IRouter>,
    @injectAll(filter.token) private filters: Array<filter>
  ) { }

  private afterAppRun() {
    Logger.success("app is run now", process.env["PORT"]);
  }

  private RegisterRouters() {
    for (let router of this.routers) {

      router.sail();

      if (router?.getPrefix) {
        this.server.use(router.getPrefix(), router.getRouter());
      } else {
        this.server.use(router.getRouter());
      }


    }
  }

  private RegisterMiddlewares() {
    if (isDev) {
      this.server.use(compress());
    }

    this.server.use(morgan("combined"));
    this.server.use(helmet({ contentSecurityPolicy: false, xssFilter: false }));
    //this.server.use(timeout("30s"));
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded());
    this.server.use(hpp());
    /* this.server.use(
       Limiter({
         windowMs: 15 * 60 * 1000,
         max: 100,
       })
     );*/
    this.server.use(express.static(join(__dirname, "public")));
    this.server.use(
      cors({
        origin: isDev ? "*" : os.hostname(),
        credentials: true,
        preflightContinue: true,
      })
    );
    this.server.use(cookieParser(process.env.COOKIES_SECRET_KEY));
    this.server.use(
      cookieSession({
        secret: process.env.JWT_SECRET,
        httpOnly: isDev,
        secure: !isDev,
        sameSite: !isDev,
      })
    );
    this.server.use(
      csurf({
        cookie: {
          maxAge: 3600,
          httpOnly: isDev,
          secure: !isDev,
          sameSite: !isDev,
        },
      })
    );
  }

  private registerExceptionFilters() {
    for (let filter of this.filters) {
      this.server.use(filter.use);
    }
  }


  private listRoutes() {
    listRoutes(this.server)
  }

  private registerExpress() {
    this.server = express();
  }

  private beforeAppRun() {
    // assign express instance
    this.registerExpress();


    this.server.use((req, res, next) => {
      try {
        const ctx = { request: req, response: res };
        container.register(Context, { useValue: ctx })
        next()
      } catch (err) {
        next(err)
      }
    })



    // register middlewares
    this.RegisterMiddlewares();


    // register routers
    this.RegisterRouters();



    if (isDev) {
      this.listRoutes();
    }

    // register exception filters
    this.registerExceptionFilters();

    // register ctx 


  }

  public serve() {
    this.beforeAppRun();
    const port = process.env["PORT"];
    this.server.listen(port, this.afterAppRun);
  }

  getServer() {
    return this.server;
  }
}