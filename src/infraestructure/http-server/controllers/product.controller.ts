import { Controller, Get, Inject, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchProductsService } from "../../../core/Catalog/application/SearchProductsService";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { AppResponse } from "../model/app.response";


@ApiTags('Products')
@Controller('/product')
@UseFilters(GlobalExceptionFilter)
export class ProductController {

    constructor(private search: SearchProductsService) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Products list from northwind company', type: AppResponse })
    @Get()
    async getProducts(): Promise<AppResponse> {
        const products = await this.search.findAll()
        return {
            status: 200,
            message: 'Products list',
            data: products
        }
    }
}