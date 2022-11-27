import { Body, Controller, Get, Inject, Logger, Post, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PurchaseUseCases } from "../../../core/application/PurchaseUseCases";
import { Order } from "../../../core/domain/Order";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { CreateOrderRequest } from "../model/create-order.request";


@ApiTags('Orders')
@UseFilters(GlobalExceptionFilter)
@Controller('/order')
export class PurchaseController {

    constructor(private purchase: PurchaseUseCases) {}
    
    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Order Created", type: Order })
    @Post()
    async create(@Body() order: CreateOrderRequest) {
        // console.log(order)
        return this.purchase.createOrder({
            ...order,
            details: order.orderDetails
        })
    }

}