import { Injectable } from "@nestjs/common";
import { PostgresCustomerRepository } from "../../../infraestructure/persistence/repositories/postgres-customer.repository";
import { Customer } from "../../domain/entities/Customer";
import { SearchCustomers } from "../SearchCustomers";

@Injectable()
export class SearchCustomersService implements SearchCustomers {

	constructor(private repository: PostgresCustomerRepository) {}
	
	findAll(): Promise<Customer[]> {
		return this.repository.findAll()
	}

	findByDemographics(customerType: string): Promise<Customer[]> {
		return this.repository.findAll()
	}

 }
