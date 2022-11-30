import { Body, Controller, Get, Post, Query, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderCreated } from "../../../../clean-architecture-examples/context-example/src/core/Orders/domain/events/OrderCreated";
import { Order } from "../../../../clean-architecture-examples/context-example/src/core/Orders/domain/Order";
import { Paginated } from "../../../core/application/services/Paginated";
import { PurchaseUseCases } from "../../../core/application/usecases/services/PurchaseUseCases";
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

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Get orders by paginated request", type: Paginated<Array<Order>> })
    @Get('/order')
    async getOrders(@Query('page')page: number, @Query('size') size: number) {
        return this.purchase.getOrders({ page, size })
    }

}