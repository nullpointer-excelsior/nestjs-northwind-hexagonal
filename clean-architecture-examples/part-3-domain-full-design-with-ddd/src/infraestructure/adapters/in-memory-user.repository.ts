import { User } from "../../core/domain/model/entities/User";
import { UserRepository } from "../../core/domain/ports/outbound/UserRepository";

export class InMemoryUserRepository implements UserRepository {

    constructor(private users: User[] ) { }
    
    async save(user: User): Promise<void> {
       this.users.push(user)
    }
    
    findByUsernameStartWith(username: string): Promise<User[]> {
        const results = this.users.filter(user => user.username.getValue().startsWith(username))
        return Promise.resolve(results)
    }

}