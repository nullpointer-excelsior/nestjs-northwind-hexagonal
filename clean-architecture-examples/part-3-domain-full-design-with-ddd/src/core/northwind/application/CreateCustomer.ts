import { CreateCustomerDto } from "../../shared/dto/CreateCustomerDto";
import { Customer } from "../domain/model/entities/Customer";

export interface CreateCustomer {
    create(customer: CreateCustomerDto): Promise<Customer>
}