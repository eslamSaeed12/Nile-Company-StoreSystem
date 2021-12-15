import { Router } from "express";

export interface IRouter {
  getRouter(): Router;
  getPrefix?(): string;
  sail(): void;
}

export abstract class Router_ implements IRouter {
  public static readonly token = Symbol("IRouter");
  abstract getRouter(): Router;
  abstract getPrefix?(): string;
  abstract sail(): void;
}
