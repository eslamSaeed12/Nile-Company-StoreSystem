import { Request, Response } from "express";
import { container } from "tsyringe";


export class Context {
    public request!: Request;
    public response!: Response;
}


export function UseCtx() {
    return container.resolve(Context)
}