import { Employee } from "../domain/entities/Employee";

export interface SearchEmployees {

    findAll(): Promise<Employee[]>;

}