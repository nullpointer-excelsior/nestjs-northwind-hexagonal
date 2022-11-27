import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../../../core/CustomerPortfolio/domain/Customer";
import { CustomersEntity } from "../northwind-database/entities/customer.entity";

@Injectable()
export class PostgresCustomerRepository {

    constructor(@InjectRepository(CustomersEntity) private repository: Repository<CustomersEntity>) { }
    

    async findAll(): Promise<Customer[]> {
        return this.repository.find()
    }

    async findByDemographics(customerType: string): Promise<Customer[]> {
        return this.repository.find()
    }

    findById(id: any): Promise<Customer> {
        return this.repository.findOneBy({ customerId : id})
    }

}