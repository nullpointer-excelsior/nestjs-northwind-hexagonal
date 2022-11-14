import { User } from "../../domain/model/entities/User";
import { UniqueUsernameGenerator } from "../../domain/ports/inbound/UniqueUsernameGenerator";
import { UserRepository } from "../../domain/ports/outbound/UserRepository";
import { DomainEventBus } from "../../shared/domain/EventBus";
import { CreateUserDto } from "../../shared/dto/CreateUserDto";
import { CreateUser } from "../CreateUser";

export class CreateUserService implements CreateUser {
    
    constructor(
        private repository: UserRepository,
        private uniqueUsernameGenerator: UniqueUsernameGenerator,
        private eventbus: DomainEventBus
    ) { }
    
    async create(createuser: CreateUserDto): Promise<void> {
        
        const username = await this.uniqueUsernameGenerator.generate(createuser.firstname, createuser.lastname)
        
        const user = User.create({
            username: username,
            email: createuser.email
        })

        await this.repository.save(user)
        
        user.pullEvents().forEach(event => this.eventbus.publish(event))

    }

}