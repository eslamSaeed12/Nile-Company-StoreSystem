import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";
import { User, Role } from "@prisma/client";

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
  "user" = "user",
  "admin" = "admin",
  "superUser" = "superuser",
}

export class Authorize {
  static getAbilites(User_: User & { role: Role }) {
    type ap = Ability<[Abilites, resources]>;
    const appAbility = Ability as AbilityClass<ap>;

    let builder = new AbilityBuilder(appAbility);

    let usrRole = <Role>User_.role;

    console.log(usrRole)

    if (usrRole.title === roles.superUser) {

      builder.can("CRUD", "ALL");

    } else {
      builder.can("CRUD", "Order")
      builder.can("CRUD", "Customer")
    }

    return builder.build();
  }
}
