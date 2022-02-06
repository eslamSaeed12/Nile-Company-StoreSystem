import { Router } from "express";
import { injectable } from "tsyringe";
import { Router_ } from "../../modules/IRouter";



@injectable()
export class webRouter extends Router_ {
    private Router: Router = Router();
    private prefix: string = "/api";

    getPrefix() {
        return this.prefix;
    }

    getRouter(): Router {
        return this.Router;
    }


    sail(): void {
        this.Router.all('*', (req, res, next) => {
            res.cookie('_csrf', req.csrfToken());
            res.render('index.html');
        })
    }
}