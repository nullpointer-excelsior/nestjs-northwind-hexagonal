import { CreateNewUserDto } from "../../../shared/dto/CreateNewUserDto";
import { Entity } from "../../../shared/domain/Entity";
import { Email } from "../valueobjects/email";
import { Username } from "../valueobjects/username";
import { UserBuilder } from "../../utils/UserBuilder";
import { UserCreated } from "../../events/UserCreated";
import { Id } from "../../../shared/domain/valueobjects/Id";

export class User extends Entity<User> {

    username: Username;
    email: Email;
    confirmed: boolean;

    private constructor() {
        super()
    }

    static create(user: CreateNewUserDto): User {

        const { username, email } = user
        const id = Id.generate()

        const userCreated = new this.UserBuilder()
            .id(id)
            .username(username)
            .email(email)
            .confirmed(false)
            .build()

        userCreated.record(new UserCreated(userCreated))

        return userCreated

    }

    static builder() {
        return new UserBuilder(new User())
    }

    equalsTo(e: User): boolean {
        return this.id.getValue() === e.id.getValue()
    }

    private static UserBuilder = class  {

        private user = new User()

        constructor() {}
    
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

}
