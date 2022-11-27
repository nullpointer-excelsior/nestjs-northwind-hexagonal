import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../../../core/Orders/domain/Customer";
import { CustomerRepository } from "../../../core/Orders/domain/ports/outbound/CustomerRepository";
import { CustomersEntity } from "../../persistence/northwind-database/entities/customer.entity";

@Injectable()
export class CustomerRepositoryAdapter implements CustomerRepository {
    
    constructor(@InjectRepository(CustomersEntity) private repository: Repository<CustomersEntity>) { }
    
    findById(id: any): Promise<Customer> {
        return this.repository.findOneBy({ customerId: id})
    }

}