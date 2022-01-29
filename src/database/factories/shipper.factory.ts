import { define } from "typeorm-seeding"
import faker from 'casual'
import { Shipper } from "../models/Shipper";

define(Shipper, (fakers) => {
    const C = new Shipper();
    C.shipper_addresse = faker._address();
    C.shipper_phoneNumber = faker._phone();
    C.shipper_name = faker._name();
    return C;
})