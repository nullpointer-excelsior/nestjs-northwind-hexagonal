import { User } from "../../model/entities/User";

export interface UserRepository {

    save(user: User): Promise<void>;
    findByUsernameStartWith(username: string): Promise<User[]>;

}