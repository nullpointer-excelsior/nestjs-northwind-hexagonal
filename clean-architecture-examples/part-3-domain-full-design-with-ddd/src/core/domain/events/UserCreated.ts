import { DomainEvent } from "../../shared/domain/DomainEvent";
import { User } from "../model/entities/User";


export class UserCreated extends DomainEvent<User> {

    static EVENT_NAME = 'user-ms.user-created'
    
    constructor(user: User) {
        super(user)
    }

    getName(): string {
        return UserCreated.EVENT_NAME
    }

}