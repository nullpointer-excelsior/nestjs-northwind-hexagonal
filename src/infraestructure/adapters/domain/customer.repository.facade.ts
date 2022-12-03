import { Injectable } from "@nestjs/common";
import { Customer } from "../../../core/domain/Customer";
import { CustomerRepository } from "../../../core/domain/ports/outbound/customerRepository";
import { MongoCustomerRepository } from "./mongo-customer.repository";

@Injectable()
export class CustomerRepositoryFacade implements CustomerRepository {
    
    constructor(
        private mongo: MongoCustomerRepository
    ) {}

    findById(id: number): Promise<Customer> {
        return this.mongo.findById(id)
    }


}