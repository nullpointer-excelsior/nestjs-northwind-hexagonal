import { User } from "../domain/model/entities/User";
import { CreateUserDto } from "../shared/dto/CreateUserDto";

export interface CreateUser {
    
    create(createUser: CreateUserDto): Promise<void>
    
}