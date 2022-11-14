import { Username } from "../../model/valueobjects/username";

export interface UniqueUsernameGenerator {
   
    generate(firstname: string, lastname: string): Promise<Username>

}