import { CreateCustomerDto } from "../../../shared/dto/CreateCustomerDto";
import { DomainException } from "../../../shared/error/DomainException";
import { Customer } from "../../domain/model/entities/Customer";
import { CustomerRepository } from "../../domain/ports/outbound/CustomerRepository";
import { UserCustomerRepository } from "../../domain/ports/outbound/UserCustomerRepository";
import { CreateCustomer } from "../CreateCustomer";

export class CreateCustomerService implements CreateCustomer {

    constructor(
        private readonly customer: CustomerRepository,
        private readonly user: UserCustomerRepository,
    ) { }

    async create(createCustomer: CreateCustomerDto): Promise<Customer> {
        
        const user = await this.user.findByEmail(createCustomer.contactEmail)
        if (!user) {
            throw new DomainException(`User with email ${createCustomer.contactEmail} not found`)
        }

        const customer = Customer.createNewCustomer({
            ...createCustomer,
            user
        })
        
        return this.customer.save(customer)

    }


}