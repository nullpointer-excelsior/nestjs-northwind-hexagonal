import { Employee } from "../../Employee";

export interface EmployeeRepository {

    findById(id: any): Promise<Employee>
    
}