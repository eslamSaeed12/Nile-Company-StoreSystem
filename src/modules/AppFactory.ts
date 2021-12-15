import { container, InjectionToken } from "tsyringe";

export class Factory {
  static construct<T>(app: InjectionToken<T>): T {
    return container.resolve(app);
  }
}
