import { Body, Controller, Get, Inject, Logger, Post, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderCreated } from "../../../../clean-architecture-examples/context-example/src/core/Orders/domain/events/OrderCreated";
import { PurchaseUseCases } from "../../../core/application/services/PurchaseUseCases";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { CreateOrderRequest } from "../model/create-order.request";


@ApiTags('Purchases')
@UseFilters(GlobalExceptionFilter)
@Controller('/purchase')
export class PurchaseController {

    constructor(private purchase: PurchaseUseCases) {}
    
    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Order Created", type: OrderCreated })
    @Post('/order')
    async create(@Body() order: CreateOrderRequest): Promise<OrderCreated> {
        return this.purchase.createOrder({
            ...order,
            details: order.orderDetails
        })
    }

}