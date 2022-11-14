import { Username } from "../../domain/model/valueobjects/username";

export interface CreateNewUserDto {
    username: Username | string;
    email: string;
}