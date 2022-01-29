import { define, factory } from "typeorm-seeding"
import faker from 'casual'
import { Customer } from "../models/Customer";
import { Account } from "../models/Account";

define(Customer, (fakers) => {
    const C = new Customer();
    C.customer_addresse = faker._address();
    C.customer_name = faker._name();
    C.customer_phoneNumber = faker._phone();
    C.isProvider = faker.boolean;
    C.account = factory(Account)() as any;
    return C;
})