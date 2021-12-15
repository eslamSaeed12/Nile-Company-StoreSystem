import { Ability } from "@casl/ability";
import { User, Role } from "@prisma/client";

type Abilites = "CREATE" | "UPDATE" | "DELETE" | "READ" | "CRUD";
type resources =
  | "Role"
  | "Category"
  | "Customer"
  | "Product"
  | "User"
  | "Order"
  | "Shipper"
  | "Supplier"
  | "ALL";

enum roles {
  "user" = "user",
  "admin" = "admin",
  "superUser" = "superUser",
}

export class Authorize {
  static getAbilites(User_: User & { role: Role }) {
    let UserAbilites = new Ability<[Abilites, resources]>();

    let usrRole = <Role>User_.role;


    if (usrRole.title === roles.superUser) {
      UserAbilites.can("CRUD", "ALL")
    } else {
      UserAbilites.can("CRUD", "Order")
      UserAbilites.can("CRUD", "Customer")
    }

    return UserAbilites;
  }
}
