import { Customer } from "../../model/entities/Customer";

export interface CustomerRepository {

    save(customer: Customer): Promise<Customer>

}