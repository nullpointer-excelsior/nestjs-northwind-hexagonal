import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "../../../core/Orders/domain/Employee";
import { EmployeeRepository } from "../../../core/Orders/domain/ports/outbound/EmployeeRepository";
import { EmployeesEntity } from "../../persistence/northwind-database/entities/employess.entity";

@Injectable()
export class EmployeeRepositoryAdapter implements EmployeeRepository {
    
    constructor(@InjectRepository(EmployeesEntity) private repository: Repository<EmployeesEntity>) { }

    async findById(id: any): Promise<Employee> {
        return this.repository.findOneBy({ employeeId: id})
    }

}