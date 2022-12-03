import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../../../core/domain/Customer";
import { CustomerRepository } from "../../../core/domain/ports/outbound/CustomerRepository";
import { CustomersEntity } from "../../persistence/northwind-database/entities/customer.entity";

@Injectable()
export class PostgresCustomerRepository implements CustomerRepository {
    
    constructor(@InjectRepository(CustomersEntity) private repository: Repository<CustomersEntity>) { }
    
    findById(id: any): Promise<Customer> {
        return this.repository.findOneBy({ customerId: id})
    }

    findAll() {
        return this.repository.find()
    }

}