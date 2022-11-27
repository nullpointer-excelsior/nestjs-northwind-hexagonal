import { Injectable } from "@nestjs/common";
import { PostgresEmployeeRepository } from "../../../infraestructure/persistence/repositories/postgres-employee.repository";
import { Employee } from "../domain/Employee";

@Injectable()
export class SearchEmployeeService {

    constructor(private repository: PostgresEmployeeRepository) {}

    findAll(): Promise<Employee[]> {
        return this.repository.findAll()
    }
    
}