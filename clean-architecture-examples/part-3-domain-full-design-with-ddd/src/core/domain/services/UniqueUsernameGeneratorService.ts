import { Username } from "../model/valueobjects/username";
import { UniqueUsernameGenerator } from "../ports/inbound/UniqueUsernameGenerator";
import { UserRepository } from "../ports/outbound/UserRepository";

export class UniqueUsernameGeneratorService implements UniqueUsernameGenerator {
   
    constructor(private repository: UserRepository) { }

    async generate(firstname: string, lastname: string): Promise<Username> {
        
        const usernamebase = Username.createUsernameBase(firstname, lastname)
        const users = await this.repository.findByUsernameStartWith(usernamebase)

        if (users.length > 1) {
            const identity = users.length + 1
            return Username.createWithIdentity(firstname, lastname, identity)
        }
        
        return Username.create(firstname, lastname)
        
    }

}