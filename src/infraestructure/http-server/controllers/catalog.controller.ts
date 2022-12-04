import { Controller, Get, Inject, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CatalogUseCases } from "../../../core/application/services/CatalogUseCases";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { AppResponse } from "../model/app.response";


@ApiTags('Catalog')
@Controller('/catalog')
@UseFilters(GlobalExceptionFilter)
export class CatalogController {

    constructor(private catalog: CatalogUseCases) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Products list from northwind company', type: AppResponse })
    @Get('/product')
    async getProducts(): Promise<AppResponse> {
        const products = await this.catalog.getProducts()
        return {
            status: 200,
            message: 'Products list',
            data: products
        }
    }

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Product categories list from northwind company', type: AppResponse })
    @Get('/category')
    async getCategories(): Promise<AppResponse> {
        const categories = await this.catalog.getCategories()
        return {
            status: 200,
            message: 'Category list',
            data: categories
        }
    }
}