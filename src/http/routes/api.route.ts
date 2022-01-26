import { ClassConstructor } from "class-transformer";
import { Router } from "express";
import { injectable } from "tsyringe";
import { BodyGuard, GateGuard } from "../../modules/IGuard";
import { Router_ } from "../../modules/IRouter";
import { AuthController } from "../controllers/auth.ctr";
import { CategoryController } from "../controllers/category.ctr";
import { customerController } from "../controllers/customer.ctr";
import { orderController } from "../controllers/order.ctr";
import { productController } from "../controllers/product.ctr";
import { roleController } from "../controllers/role.ctr";
import { shipperController } from "../controllers/shipper.ctr";
import { supplierController } from "../controllers/supplier.ctr";
import { userController } from "../controllers/user.ctr";
import { UtilsController } from "../controllers/utils.ctr";
import { AuthLogin } from "../dtos/Auth.dto";
import { createCategory, updateCategory } from "../dtos/category.dto";
import { PrimaryKey } from "../dtos/common.dto";
import { createCustomer, updateCustomer } from "../dtos/customer.dto";
import { updateOrder, createOrder } from "../dtos/order.dto";
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


    // utils

    this.Router.get('/utils/stats', middlewareCollection(), this.utilsCtr.getStats);
    this.Router.get('/utils/shippers', middlewareCollection(), this.utilsCtr.topShippers);
    this.Router.get('/utils/customers', middlewareCollection(), this.utilsCtr.topCustomers);
    this.Router.get('/utils/categories', middlewareCollection(), this.utilsCtr.topFiveCategories);
    this.Router.get('/utils/products', middlewareCollection(), this.utilsCtr.topProducts);
    this.Router.get('/utils/suppliers', middlewareCollection(), this.utilsCtr.topSuppliers);

    // router middlewares
    this.Router.get("/role", middlewareCollection(), GateGuard.Authroize("READ", "Role"), this.roleCtr.index);
    this.Router.get("/role/:id/:title", middlewareCollection(), GateGuard.Authroize("READ", "Role"), this.roleCtr.isUniqueUpdate);
    this.Router.get("/role/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "Role"), this.roleCtr.find);
    this.Router.post("/role/:title", middlewareCollection(), GateGuard.Authroize("READ", "Customer"), this.roleCtr.findByName)
    this.Router.post("/role", middlewareCollection(createRole), GateGuard.Authroize("CREATE", "Role"), this.roleCtr.create);
    this.Router.patch("/role", middlewareCollection(updateRole), GateGuard.Authroize("UPDATE", "Role"), this.roleCtr.update);
    this.Router.delete("/role", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "Role"), this.roleCtr.delete);

    // category routes
    this.Router.get("/category", middlewareCollection(), GateGuard.Authroize("READ", "Category"), this.categoryCtr.index);
    this.Router.get("/category/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "Category"), this.categoryCtr.find);
    this.Router.post("/category/:title", middlewareCollection(), GateGuard.Authroize("READ", "Customer"), this.categoryCtr.findByName)
    this.Router.get("/category/:id/:title", middlewareCollection(), GateGuard.Authroize("READ", "Category"), this.categoryCtr.isUniqueUpdate);
    this.Router.post("/category", middlewareCollection(createCategory), GateGuard.Authroize("CREATE", "Category"), this.categoryCtr.create);
    this.Router.patch("/category", middlewareCollection(updateCategory), GateGuard.Authroize("UPDATE", "Category"), this.categoryCtr.update);
    this.Router.delete("/category", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "Category"), this.categoryCtr.delete);

    // shipper routes
    this.Router.get("/shipper", middlewareCollection(), GateGuard.Authroize("READ", "Shipper"), this.shiperCtr.index);
    this.Router.get("/shipper/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "Shipper"), this.shiperCtr.find);
    this.Router.post("/shipper/:shipper_name", middlewareCollection(), GateGuard.Authroize("READ", "Customer"), this.shiperCtr.findByName)
    this.Router.get("/shipper/:id/:shipper_name", middlewareCollection(), GateGuard.Authroize("READ", "Shipper"), this.shiperCtr.isUniqueUpdate);
    this.Router.post("/shipper", middlewareCollection(createShipper), GateGuard.Authroize("CREATE", "Shipper"), this.shiperCtr.create);
    this.Router.patch("/shipper", middlewareCollection(updateShipper), GateGuard.Authroize("UPDATE", "Shipper"), this.shiperCtr.update);
    this.Router.delete("/shipper", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "Shipper"), this.shiperCtr.delete);

    // product routes
    this.Router.get("/product", middlewareCollection(), GateGuard.Authroize("READ", "Product"), this.proudctCtr.index);
    this.Router.get("/product/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "Product"), this.proudctCtr.find);
    this.Router.get("/product/:id/:product_name", middlewareCollection(), GateGuard.Authroize("READ", "Product"), this.proudctCtr.isUniqueUpdate);
    this.Router.post("/product", middlewareCollection(createProduct), GateGuard.Authroize("CREATE", "Product"), this.proudctCtr.create);
    this.Router.post("/product/xst", middlewareCollection(), GateGuard.Authroize("CREATE", "Product"), this.proudctCtr.checkPname);
    this.Router.patch("/product", middlewareCollection(updateProduct), GateGuard.Authroize("UPDATE", "Product"), this.proudctCtr.update);
    this.Router.delete("/product", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "Product"), this.proudctCtr.delete);

    // supplier routes
    this.Router.get("/supplier", middlewareCollection(), GateGuard.Authroize("READ", "Supplier"), this.supplierCtr.index);
    this.Router.get("/supplier/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "Supplier"), this.supplierCtr.find);
    this.Router.post("/supplier/:Supplier_name", middlewareCollection(), GateGuard.Authroize("READ", "Supplier"), this.supplierCtr.findByName)
    this.Router.get("/supplier/:id/:Supplier_name", middlewareCollection(), GateGuard.Authroize("READ", "Supplier"), this.supplierCtr.isUniqueUpdate);
    this.Router.post("/supplier", middlewareCollection(createSupplier), GateGuard.Authroize("CREATE", "Supplier"), this.supplierCtr.create);
    this.Router.patch("/supplier", middlewareCollection(updateSupplier), GateGuard.Authroize("UPDATE", "Supplier"), this.supplierCtr.update);
    this.Router.delete("/supplier", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "Supplier"), this.supplierCtr.delete);

    // order routes
    this.Router.get("/order", middlewareCollection(), GateGuard.Authroize("READ", "Order"), this.orderCtr.index);
    this.Router.get("/order/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "Order"), this.orderCtr.find);
    this.Router.post("/order", middlewareCollection(createOrder), GateGuard.Authroize("CREATE", "Order"), this.orderCtr.create);
    this.Router.patch("/order", middlewareCollection(updateOrder), GateGuard.Authroize("UPDATE", "Order"), this.orderCtr.update);
    this.Router.delete("/order", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "Order"), GateGuard.Authroize("DELETE", "Order"), this.orderCtr.delete);

    // user routes
    this.Router.get("/user", middlewareCollection(), GateGuard.Authroize("READ", "User"), this.userCtr.index)
    this.Router.get("/user/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "User"), this.userCtr.find)
    this.Router.post("/user/:username", middlewareCollection(), GateGuard.Authroize("READ", "Customer"), this.userCtr.findByName)
    this.Router.get("/user/:id/:username", middlewareCollection(), GateGuard.Authroize("READ", "User"), this.userCtr.isUniqueUpdate);
    this.Router.post("/user", middlewareCollection(createUser), GateGuard.Authroize("CREATE", "User"), this.userCtr.create)
    this.Router.patch("/user", middlewareCollection(updateUser), GateGuard.Authroize("UPDATE", "User"), this.userCtr.update)
    this.Router.delete("/user", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "User"), this.userCtr.delete)

    // user routes
    this.Router.get("/customer", middlewareCollection(), GateGuard.Authroize("READ", "Customer"), this.cusotmerCtr.index)
    this.Router.get("/customer/:id", middlewareCollection(PrimaryKey), GateGuard.Authroize("READ", "Customer"), this.cusotmerCtr.find)
    this.Router.post("/customer/:customer_name", middlewareCollection(), GateGuard.Authroize("READ", "Customer"), this.cusotmerCtr.findByName)
    this.Router.get("/customer/:id/:customer_name", middlewareCollection(), GateGuard.Authroize("READ", "Customer"), this.cusotmerCtr.isUniqueUpdate);
    this.Router.post("/customer", middlewareCollection(createCustomer), GateGuard.Authroize("CREATE", "Customer"), this.cusotmerCtr.create)
    this.Router.patch("/customer", middlewareCollection(updateCustomer), GateGuard.Authroize("UPDATE", "Customer"), this.cusotmerCtr.update)
    this.Router.delete("/customer", middlewareCollection(PrimaryKey), GateGuard.Authroize("DELETE", "Customer"), this.cusotmerCtr.delete)

    // auth routes [authenticated]
    this.Router.post("/auth", BodyGuard.validate(AuthLogin), this.authCtr.login)
    this.Router.delete("/auth", middlewareCollection(), this.authCtr.logout);
    this.Router.get("/auth", middlewareCollection(), this.authCtr.ok)
  }



  constructor(private utilsCtr: UtilsController, private authenticated: AuthenticatedMiddleware, private jwtChecker: JwtCheckerMiddleware, private cusotmerCtr: customerController, private authCtr: AuthController, private categoryCtr: CategoryController, private userCtr: userController, private orderCtr: orderController, private supplierCtr: supplierController, private proudctCtr: productController, private shipperCtr: shipperController, private roleCtr: roleController, private shiperCtr: shipperController) {
    super()
  }
}
