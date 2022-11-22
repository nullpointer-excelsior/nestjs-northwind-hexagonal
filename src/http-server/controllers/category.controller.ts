import { Controller, Get, Inject } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchCategoriesService } from "../../core/application/services/SearchCategoriesService";
import { AppResponse } from "../model/app.response";


@ApiTags('Category')
@Controller('/category')
export class CategoryController {

    constructor(private search: SearchCategoriesService) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Product categories list from northwind company', type: AppResponse })
    @Get()
    async getCategories(): Promise<AppResponse> {
        const categories = await this.search.findAll()
        return {
            status: 200,
            message: 'Category list',
            data: categories
        }
    }
}