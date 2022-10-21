import { Body, Controller, Inject, Post, UseFilters } from "@nestjs/common";
import { ProductCreator } from "../../../core/application/ProductCreator";
import { PRODUCT_CREATOR } from "../../../core/injection.tokens";
import { AppLogger } from "../../shared/AppLogger";
import { ProductCreatorFilter } from "../exception-filters/product-exception.filter";
import { AppResponse } from "../model/app.response";
import { CreateProductRequest } from "../model/create-product.request";


@Controller('/product')
@UseFilters(ProductCreatorFilter)
export class ProductController {

    constructor(@Inject(PRODUCT_CREATOR) private product: ProductCreator) {}

    @Post()
    async createProduct(@Body() request: CreateProductRequest): Promise<AppResponse> {
        
        AppLogger.log(`(POST) Create product`, request)
        const productId = await this.product.create(request) 
        
        return {
            status: 201,
            message: `Product(id=${productId}) created OK`
        }

    }
}