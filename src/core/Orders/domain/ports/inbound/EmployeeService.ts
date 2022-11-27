import { EntityNotFoundException } from "../../../../shared/exception/EntityNotFoundException"
import { Employee } from "../../Employee"
import { EmployeeRepository } from "../outbound/EmployeeRepository"

export class EmployeeService {
    
    constructor(private readonly employee: EmployeeRepository) {}

    async findById(id: any): Promise<Employee> {
        
        const employee = await this.employee.findById(id)
        if (!employee) {
            throw new EntityNotFoundException(`Employee(id="${id}") not found`)
        }
        return employee

    }
}