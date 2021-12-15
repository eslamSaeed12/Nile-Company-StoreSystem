import { ClassConstructor } from "class-transformer";
import { Router } from "express";
import { injectable } from "tsyringe";
import { BodyGuard } from "../../modules/IGuard";
import { Router_ } from "../../modules/IRouter";
import { AuthController } from "../controllers/auth.ctr";
import { CategoryController } from "../controllers/category.ctr";
import { orderController } from "../controllers/order.ctr";
import { productController } from "../controllers/product.ctr";
import { roleController } from "../controllers/role.ctr";
import { shipperController } from "../controllers/shipper.ctr";
import { supplierController } from "../controllers/supplier.ctr";
import { userController } from "../controllers/user.ctr";
import { AuthLogin } from "../dtos/Auth.dto";
import { createCategory, updateCategory } from "../dtos/category.dto";
import { PrimaryKey } from "../dtos/common.dto";
import { createOrder, order_sync, updateOrder } from "../dtos/order.dto";
import { createProduct, updateProduct } from "../dtos/product.dto";
import { createRole, updateRole } from "../dtos/Role.dto";
import { createShipper, updateShipper } from "../dtos/shipper.dto";
import { createSupplier, updateSupplier } from "../dtos/supplier.dto";
import { createUser, updateUser } from "../dtos/user.dto";
import { JwtCheckerMiddleware } from "../middlewares/jwtChecker.md";
import { AuthenticatedMiddleware } from "../middlewares/unAuthenticated.md";

@injectable()
export class ApiRouter extends Router_ {
  private Router: Router = Router();
  private prefix: string = "/api";
  getRouter() {
    return this.Router;
  }

  getPrefix() {
    return this.prefix;
  }

  sail() {
    const withValidation = (validationBody: ClassConstructor<any>) => [this.authenticated.use, this.jwtChecker.use, BodyGuard.validate(validationBody)];

    const withoutValidation = [this.authenticated.use, this.jwtChecker.use];

    const middlewareCollection = (validationBody?: ClassConstructor<any>) => validationBody ? withValidation(validationBody) : withoutValidation;

    // router middlewares
    this.Router.get("/role", middlewareCollection(), this.roleCtr.index);
    this.Router.get("/role/:id", middlewareCollection(PrimaryKey), this.roleCtr.find);
    this.Router.post("/role", middlewareCollection(createRole), this.roleCtr.create);
    this.Router.patch("/role", middlewareCollection(updateRole), this.roleCtr.update);
    this.Router.delete("/role", middlewareCollection(PrimaryKey), this.roleCtr.delete);

    // category routes
    this.Router.get("/category", middlewareCollection(), this.shipperCtr.index);
    this.Router.get("/category/:id", middlewareCollection(PrimaryKey), this.categoryCtr.find);
    this.Router.post("/category", middlewareCollection(createCategory), this.categoryCtr.create);
    this.Router.patch("/category", middlewareCollection(updateCategory), this.categoryCtr.update);
    this.Router.delete("/category", middlewareCollection(PrimaryKey), this.categoryCtr.delete);

    // shipper routes
    this.Router.get("/shipper", middlewareCollection(), this.shiperCtr.index);
    this.Router.get("/shipper/:id", middlewareCollection(PrimaryKey), this.shiperCtr.find);
    this.Router.post("/shipper", middlewareCollection(createShipper), this.shiperCtr.create);
    this.Router.patch("/shipper", middlewareCollection(updateShipper), this.shiperCtr.update);
    this.Router.delete("/shipper", middlewareCollection(PrimaryKey), this.shiperCtr.delete);

    // product routes
    this.Router.get("/product", middlewareCollection(), this.proudctCtr.index);
    this.Router.get("/product/:id", middlewareCollection(PrimaryKey), this.proudctCtr.find);
    this.Router.post("/product", middlewareCollection(createProduct), this.proudctCtr.create);
    this.Router.patch("/product", middlewareCollection(updateProduct), this.proudctCtr.update);
    this.Router.delete("/product", middlewareCollection(PrimaryKey), this.proudctCtr.delete);

    // supplier routes
    this.Router.get("/supplier", middlewareCollection(), this.supplierCtr.index);
    this.Router.get("/supplier/:id", middlewareCollection(PrimaryKey), this.supplierCtr.find);
    this.Router.post("/supplier", middlewareCollection(createSupplier), this.supplierCtr.create);
    this.Router.patch("/supplier", middlewareCollection(updateSupplier), this.supplierCtr.update);
    this.Router.delete("/supplier", middlewareCollection(PrimaryKey), this.supplierCtr.delete);

    // order routes
    this.Router.get("/order", middlewareCollection(), this.orderCtr.index);
    this.Router.get("/order/:id", middlewareCollection(PrimaryKey), this.orderCtr.find);
    this.Router.post("/order", middlewareCollection(createOrder), this.orderCtr.create);
    this.Router.patch("/order", middlewareCollection(updateOrder), this.orderCtr.update);
    this.Router.delete("/order", middlewareCollection(PrimaryKey), this.orderCtr.delete);
    this.Router.post("/order/:orderId/:productId", middlewareCollection(order_sync), this.orderCtr.attachProduct);
    this.Router.delete("/order/:orderId/:productId", middlewareCollection(order_sync), this.orderCtr.attachProduct);

    // user routes
    this.Router.get("/user", middlewareCollection(), this.userCtr.index)
    this.Router.get("/user/:id", middlewareCollection(PrimaryKey), this.userCtr.find)
    this.Router.post("/user", middlewareCollection(createUser), this.userCtr.create)
    this.Router.patch("/user", middlewareCollection(updateUser), this.userCtr.update)
    this.Router.delete("/user", middlewareCollection(PrimaryKey), this.userCtr.delete)

    // auth routes [authenticated]
    this.Router.post("/auth", BodyGuard.validate(AuthLogin), this.authCtr.login)
    this.Router.delete("/auth", middlewareCollection(), this.authCtr.logout);
  }



  constructor(private authenticated: AuthenticatedMiddleware, private jwtChecker: JwtCheckerMiddleware, private authCtr: AuthController, private categoryCtr: CategoryController, private userCtr: userController, private orderCtr: orderController, private supplierCtr: supplierController, private proudctCtr: productController, private shipperCtr: shipperController, private roleCtr: roleController, private shiperCtr: shipperController) {
    super()
  }
}
