import { Controller, Get } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchShipperService } from "../../../core/Suppliers/application/SearchShipperService";
import { Shipper } from "../../../core/Suppliers/domain/Shipper";

@ApiTags('Shippers')
@Controller('/shipper')
export class ShipperController {

    constructor(
        private service: SearchShipperService
    ) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Northwind's shippers", type: Array<Shipper> })
    @Get()
    async getShipper(): Promise<Shipper[]> {
        return this.service.findAll()
    }

}