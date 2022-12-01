import { Body, Controller, Get, Post, Query, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Paginated } from "../../../core/application/services/Paginated";
import { PurchaseUseCases } from "../../../core/application/usecases/services/PurchaseUseCases";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { CreateOrderRequest } from "../model/create-order.request";
import { OrderCreatedDto } from "../../../core/shared/dto/OrderCreatedDto"
import { Order } from "../../../core/domain/Order";

@ApiTags('Purchases')
@UseFilters(GlobalExceptionFilter)
@Controller('/purchase')
export class PurchaseController {

    constructor(private purchase: PurchaseUseCases) {}
    
    @ApiInternalServerErrorResponse({ description: 'Error server'})
    // @ApiResponse({ description: "Order Created", type: OrderCreatedDto })
    @Post('/order')
    async create(@Body() order: CreateOrderRequest): Promise<OrderCreatedDto> {
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