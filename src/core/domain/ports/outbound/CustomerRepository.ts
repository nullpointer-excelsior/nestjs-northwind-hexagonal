import { Customer } from "../../Customer";

export interface CustomerRepository {
    findById(id: any): Promise<Customer>
}