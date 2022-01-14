import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";
import { Role } from "../database/models/Role";
import { User } from "../database/models/User";
export type Abilites = "CREATE" | "UPDATE" | "DELETE" | "READ" | "CRUD";
export type resources =
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
  "admin" = "admin",
  "superUser" = "superuser",
}

export class Authorize {
  static getAbilites(User_: User) {
    type ap = Ability<[Abilites, resources]>;
    const appAbility = Ability as AbilityClass<ap>;

    let builder = new AbilityBuilder(appAbility);

    let usrRole = User_?.role;



    if (usrRole?.title === roles.superUser) {

      builder.can("CRUD", "ALL");

    } else {
      builder.can("CRUD", "Order")
      builder.can("CRUD", "Customer")
    }

    return builder.build();
  }
}
