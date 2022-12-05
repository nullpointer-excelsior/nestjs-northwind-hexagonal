import { Body, Controller, Get, Post, Query, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Paginated } from "../../../core/application/utils/Paginated";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { CreateOrderRequest } from "../model/create-order.request";
import { OrderCreatedDto } from "../../../core/shared/dto/OrderCreatedDto"
import { Order } from "../../../core/domain/Order";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateOrderCommand } from "../../../core/application/entrypoint/commands/CreateOrderCommand";
import { OrdersQuery } from "../../../core/application/entrypoint/queries/OrdersQuery";

@ApiTags('Purchases')
@UseFilters(GlobalExceptionFilter)
@Controller('/purchase')
export class PurchaseController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    
    @ApiInternalServerErrorResponse({ description: 'Error server'})
    // @ApiResponse({ description: "Order Created", type: OrderCreatedDto })
    @Post('/order')
    async create(@Body() order: CreateOrderRequest): Promise<OrderCreatedDto> {
        return await this.command.execute(new CreateOrderCommand({
            ...order,
            details: order.orderDetails
        }))
    }

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Get orders by paginated request", type: Paginated<Array<Order>> })
    @Get('/order')
    async getOrders(@Query('page')page: number, @Query('size') size: number) {
        return this.query.execute(new OrdersQuery(page, size))
    }

}