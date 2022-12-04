import { Controller, Get } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CompanySuppliersUseCases } from "../../../core/application/services/CompanySuppliersUseCases";
import { Shipper } from "../../../core/domain/Shipper";

@ApiTags('Suppliers')
@Controller('/company-suppliers')
export class ShipperController {

    constructor(private suppliers: CompanySuppliersUseCases) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Northwind's suppliers", type: Array<Shipper> })
    @Get('/suppliers')
    async getSuppliers() {
        return this.suppliers.getSuppliers()
    }

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Northwind's suppliers", type: Array<Shipper> })
    @Get('/suppliers')
    async getShippers() {
        return this.suppliers.getShippers()
    }
}