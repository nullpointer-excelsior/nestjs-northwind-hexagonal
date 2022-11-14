import { UserCustomer } from "../../model/entities/UserCustomer";

export interface UserCustomerRepository {
    updateConfirmed(user: UserCustomer): Promise<UserCustomer>;
    findByEmail(email: string): Promise<UserCustomer>;
}