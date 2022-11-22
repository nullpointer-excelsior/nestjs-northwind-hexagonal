import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchCustomersService } from "../../core/application/services/SearchCustomersService";
import { Customer } from "../../core/domain/entities/Customer";


@ApiTags('Customers')
@Controller('/customer')
export class CustomerController {

    constructor(private search: SearchCustomersService) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Customers list from northwind company', type: Array<Customer> })
    @Get()
    async getCustomers(): Promise<Customer[]> {
        return this.search.findAll()
    }

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Customers list by demographic id from northwind company', type: Array<Customer> })
    @Get('/demoghraphic/:id')
    async getCustomersByDemographic(@Param('id') demographicId: string): Promise<Customer[]> {
        return this.search.findByDemographics(demographicId)
    }

}