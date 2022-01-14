import { container } from "tsyringe";
import { BodyGuardFilter_ } from "../http/filters/bodyGuardFilter";
import { HtppExceptionFilter } from "../http/filters/HttpExceptionFilter";
import { isJwtActiveMiddleware } from "../http/middlewares/isJwtActive.md";
import { JwtCheckerMiddleware } from "../http/middlewares/jwtChecker.md";
import { AuthenticatedMiddleware } from "../http/middlewares/unAuthenticated.md";
import { JwtErrorFilter } from "../http/filters/jwtExpiredFilter";
import { ApiRouter } from "../http/routes/api.route";
import { filter, middlewre } from "../modules/IMiddleware";
import { Router_ } from "../modules/IRouter";
import { ContainedType, useContainer, ContainerInterface } from "typeorm";
import { UnknownErrorFilter } from "../http/filters/UnknownErrorFilter";
import { TypeormErrorFilter } from "../http/filters/TypeormFilter";

//import { TaskRunner } from "../modules/ITask";

class ContainerAdapter implements ContainerInterface {
    get<T>(someClass: ContainedType<T>): T {
        return container.resolve(<any>someClass);
    }
}


useContainer(new ContainerAdapter)

container.register(Router_.token, ApiRouter);
container.register(middlewre.token, JwtCheckerMiddleware);
container.register(middlewre.token, AuthenticatedMiddleware);
container.register(middlewre.token, isJwtActiveMiddleware);
container.register(filter.token, JwtErrorFilter);
container.register(filter.token, BodyGuardFilter_);
container.register(filter.token, TypeormErrorFilter);
container.register(filter.token, HtppExceptionFilter);
container.register(filter.token, UnknownErrorFilter);
// container.register(TaskRunner.token)