import { User } from "../../model/entities/User";
import { Username } from "../../model/valueobjects/username";

export interface UserService {

    create(user: User): Promise<void>;
    generateUniqueUsername(firstname: string, lastname: string): Promise<Username>;
    publishEvents(user: User): Promise<void>;

}