import { User } from "../model/entities/User"
import { Email } from "../model/valueobjects/email"
import { Username } from "../model/valueobjects/username"
import { Id } from "../../shared/domain/valueobjects/Id"

export class UserBuilder {

    constructor(private user: User) {}

    id(id: Id | string) {
        this.user.id = typeof id === 'string' ? new Id(id) : id
        return this
    }

    username(username: Username | string) {
        this.user.username = typeof username  === 'string' ? new Username(username) : username
        return this
    }

    email(email: Email | string) {
        this.user.email = typeof email === 'string' ? new Email(email) : email
        return this
    }

    confirmed(confirmed: boolean) {
        this.user.confirmed = confirmed
        return this
    }

    build() {
        return this.user
    }

}
