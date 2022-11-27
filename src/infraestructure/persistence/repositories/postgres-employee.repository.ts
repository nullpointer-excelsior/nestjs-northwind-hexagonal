import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "../../../core/Company/domain/Employee";
import { EmployeesEntity } from "../northwind-database/entities/employess.entity";

@Injectable()
export class PostgresEmployeeRepository {

    constructor(@InjectRepository(EmployeesEntity) private repository: Repository<EmployeesEntity>) { }

    findById(id: any): Promise<Employee> {
        return this.repository.findOneBy({ employeeId : id})
    }

    async findAll(): Promise<Employee[]> {
        return this.repository.find()
    }

}