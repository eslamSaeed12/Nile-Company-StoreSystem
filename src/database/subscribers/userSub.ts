import { hashSync } from "bcryptjs";
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { User } from "../models/User";

@EventSubscriber()
export class userSub implements EntitySubscriberInterface<any> {

    listenTo() {
        return User;
    }


    beforeInsert(event: InsertEvent<User>) {
        event.entity.password = hashSync(event.entity.password);
    }
   
}
