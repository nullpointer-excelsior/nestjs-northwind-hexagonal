import { Injectable } from "@nestjs/common";
import { PostgresEmployeeRepository } from "../../../persistence/repositories/postgres-employee.repository";
import { Employee } from "../../domain/entities/Employee";

@Injectable()
export class SearchEmployeeService {

    constructor(private repository: PostgresEmployeeRepository) {}

    findAll(): Promise<Employee[]> {
        return this.repository.findAll()
    }
    
}