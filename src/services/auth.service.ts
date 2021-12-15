import { User } from "@prisma/client";
import { AuthRegister, AuthLogin } from "../http/dtos/Auth.dto";
import bcrypt from "bcryptjs";
import { injectable } from "tsyringe";
import { userService } from "./user.service";

@injectable()
export class authService {
  async authenticate({
    username,
    password,
  }: AuthLogin): Promise<User | null> {
    const usr = await this.userService.findByUsername(username);

    if (usr && bcrypt.compareSync(password, usr.password)) {
      return usr;
    }

    return null;
  }

  async register({ username, password }: AuthRegister) {
    return await this.userService.insert({ username, password })
  }


  constructor(private userService: userService) {

  }
}

