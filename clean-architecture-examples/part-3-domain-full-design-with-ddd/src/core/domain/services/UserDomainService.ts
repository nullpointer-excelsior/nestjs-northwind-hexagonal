import { DomainEventBus } from "../../shared/domain/EventBus"
import { User } from "../model/entities/User"
import { Username } from "../model/valueobjects/username"
import { UserService } from "../ports/inbound/UserService"
import { UserRepository } from "../ports/outbound/UserRepository"

export class UserDomainService implements UserService {

    constructor(
        private repository: UserRepository,
        private eventbus: DomainEventBus
    ) { }


    async create(user: User): Promise<void> {
        return this.repository.save(user)
    }

    async publishEvents(user: User): Promise<void> {
        user
            .pullEvents()
            .forEach(event => this.eventbus.publish(event))
    }

    async generateUniqueUsername(firstname: string, lastname: string): Promise<Username> {

        const usernamebase = Username.createUsernameBase(firstname, lastname)
        const users = await this.repository.findByUsernameStartWith(usernamebase)

        if (users.length > 1) {
            const identity = users.length + 1
            return Username.createWithIdentity(firstname, lastname, identity)
        }

        return Username.create(firstname, lastname)

    }

    

}