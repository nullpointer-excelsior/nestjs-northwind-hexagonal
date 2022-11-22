import { Controller, Get } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchShipperService } from "../../core/application/services/SearchShipperService";
import { Shipper } from "../../core/domain/entities/Shipper";

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