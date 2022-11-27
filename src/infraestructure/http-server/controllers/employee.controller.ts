import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchEmployeeService } from "../../../core/Company/application/SearchEmployeeService";
import { Employee } from "../../../core/Company/domain/Employee";


@ApiTags('Employees')
@Controller('/employee')
export class EmployeeController {

    constructor(private service: SearchEmployeeService) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Northwind's employees", type: Array<Employee> })
    @Get()
    async getEmployess(): Promise<Employee[]> {
        return this.service.findAll()
    }

}