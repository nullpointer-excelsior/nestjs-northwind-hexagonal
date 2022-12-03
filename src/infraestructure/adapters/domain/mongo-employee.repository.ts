import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmployeeRepository } from "../../../core/domain/ports/outbound/employeeRepository";
import { Employee } from "../../../core/domain/Employee";
import { EmployeeDocument } from "../../persistence/southwind-database/model/employee.schema";

@Injectable()
export class MongoEmployeeRepository implements EmployeeRepository {

    constructor(@InjectModel('Employee') private model: Model<EmployeeDocument>) { }

    async findById(id: number): Promise<Employee> {
        return this.model
            .findOne({ employeeId: id })
            .exec()
            .then(doc => this.map(doc));
    }

    async count() {
        return this.model.count()
    }

    async save(c: Employee){
        const employee = new this.model({
            ...c
        })
        await employee.save()
    }



    map(doc: EmployeeDocument) {
        const c = new Employee()
        return {
            ...c
        } as Employee
    }
}