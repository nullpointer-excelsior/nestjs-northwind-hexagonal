import { Customer } from "../domain/entities/Customer"

export interface SearchCustomers {
    
    findAll(): Promise<Customer[]>
    findByDemographics(customerType: string): Promise<Customer[]>

}