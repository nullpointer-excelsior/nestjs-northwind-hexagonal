import { EntityNotFoundException } from "../../../../shared/exception/EntityNotFoundException"
import { Customer } from "../../Customer"
import { CustomerRepository } from "../outbound/CustomerRepository"

export class CustomerService {
    
    constructor(private readonly customer: CustomerRepository) {}

    async findById(id: any): Promise<Customer> {
        
        const customer = await this.customer.findById(id)
        if (!customer) {
            throw new EntityNotFoundException(`Customer(id="${id}") not found`)
        }
        return customer

    }
}