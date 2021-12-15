import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

@injectable()
export class jwtService {
  encode(Object_: any) {
    return jwt.sign(Object_, <string>process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  }

  async decode(json_web_token: string) {
    return jwt.decode(json_web_token);
  }

  validate(json_web_token: string) {
    return jwt.verify(json_web_token, <string>process.env.JWT_SECRET);
  }
}
