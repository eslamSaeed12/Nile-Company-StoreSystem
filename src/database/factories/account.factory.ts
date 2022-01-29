import { define } from "typeorm-seeding"
import { Account } from "../models/Account";

define(Account, (fakers) => {
    const C = new Account();
    C.debt = 0;
    return C;
})