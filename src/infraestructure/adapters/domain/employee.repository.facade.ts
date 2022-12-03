import { Injectable } from "@nestjs/common";
import { Employee } from "../../../core/domain/Employee";
import { EmployeeRepository } from "../../../core/domain/ports/outbound/EmployeeRepository";
import { MongoEmployeeRepository } from "./mongo-employee.repository";

@Injectable()
export class EmployeeRepositoryFacade implements EmployeeRepository {
    
    constructor(
        private mongo: MongoEmployeeRepository
    ) {}

    findById(id: number): Promise<Employee> {
        return this.mongo.findById(id)
    }


}