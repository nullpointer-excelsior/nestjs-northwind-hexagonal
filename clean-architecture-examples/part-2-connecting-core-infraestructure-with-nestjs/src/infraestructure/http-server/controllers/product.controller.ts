import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseFilters } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductApplication } from "../../../core/application/ProductApplication";
import { PRODUCT_APPLICATION } from "../../../core/core.module";
import { Log } from "../../shared/Log";
import { ProductCreatorFilter } from "../exception-filters/product-exception.filter";
import { AppResponse } from "../model/app.response";
import { CreateProductRequest } from "../model/create-product.request";


@ApiTags('Products')
@Controller('/product')
@UseFilters(ProductCreatorFilter)
export class ProductController {

    constructor(@Inject(PRODUCT_APPLICATION) private application: ProductApplication) {}

    @ApiBadRequestResponse({ description: 'Invalid category id or supplier id'})
    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppResponse })
    @HttpCode(201)
    @Post()
    async createProduct(@Body() request: CreateProductRequest): Promise<AppResponse> {
        
        Log.info(`(POST) Create product`, request)
        const productId = await this.application.createProduct(request) 
        
        return {
            status: 201,
            message: `Product(id=${productId}) created OK`
        }

    }
}