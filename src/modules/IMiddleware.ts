import { ErrorRequestHandler, RequestHandler } from "express";

export abstract class middlewre {
  public static readonly token = Symbol("middleware");
  abstract use: RequestHandler | ErrorRequestHandler;
}

export abstract class filter {
  public static readonly token = Symbol("filter");
  abstract use: ErrorRequestHandler;
}
