import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "../../../core/domain/entities/Employee";
import { EmployeesEntity } from "../northwind-database/entities/employess.entity";

@Injectable()
export class PostgresEmployeeRepository {

    constructor(@InjectRepository(EmployeesEntity) private repository: Repository<EmployeesEntity>) { }

    async findAll(): Promise<Employee[]> {
        return this.repository.find()
    }

}