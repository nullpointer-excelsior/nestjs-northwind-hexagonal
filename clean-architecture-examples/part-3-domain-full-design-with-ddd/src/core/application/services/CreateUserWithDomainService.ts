import { User } from "../../domain/model/entities/User";
import { UserService } from "../../domain/ports/inbound/UserService";
import { CreateUserDto } from "../../shared/dto/CreateUserDto";
import { CreateUser } from "../CreateUser";

export class CreateUserWithDomainService implements CreateUser {

    constructor(
        private service: UserService
    ) { }

    async create(createuser: CreateUserDto): Promise<void> {

        const username = await this.service.generateUniqueUsername(createuser.firstname, createuser.lastname)

        const user = User.create({
            username: username,
            email: createuser.email
        })

        await this.service.create(user)
        
        await this.service.publishEvents(user)

    }


}