import { define } from "typeorm-seeding"
import faker from 'casual'
import { Supplier } from "../models/Supplier";

define(Supplier, (fakers) => {
    const C = new Supplier();
    C.supplier_addresse = faker._address();
    C.supplier_phoneNumber = faker._phone();
    C.Supplier_name = faker._name();
    return C;
});