import { Entity } from "../../../../shared/domain/Entity";
import { Email } from "../../../../domain/model/valueobjects/email";
import { Username } from "../../../../domain/model/valueobjects/username";

export class UserCustomer extends Entity<UserCustomer> {

    username: Username;
    email: Email;

    equalsTo(e: UserCustomer): boolean {
        return this.id.getValue() === e.id.getValue()
    }

}
