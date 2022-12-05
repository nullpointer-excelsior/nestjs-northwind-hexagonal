import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CompanyUseCases } from "../../../core/application/services/CompanyUseCases";
import { Employee } from "../../../core/domain/Employee";


@ApiTags('Company')
@Controller('/company')
export class CompanyController {

    constructor(private company: CompanyUseCases) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Northwind's employees", type: Array<Employee> })
    @Get('/employee')
    async getEmployess() {
        return this.company.getEmployees()
    }

}