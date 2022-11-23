import { Body, Controller, Get, Post, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOrderService } from "../../../core/application/services/CreateOrderService";
import { SearchOrderService } from "../../../core/application/services/SearchOrderService";
import { Order } from "../../../core/domain/entities/Order";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { CreateOrderRequest } from "../model/create-order.request";


@ApiTags('Orders')
@UseFilters(GlobalExceptionFilter)
@Controller('/order')
export class OrderController {

    constructor(
        private searchOrder: SearchOrderService,
        private createOrder: CreateOrderService
    ) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Northwind's orders", type: Array<Order> })
    @Get()
    async getOrders(): Promise<Order[]> {
        return this.searchOrder.findAll()
    }

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Order Created", type: Order })
    @Post()
    async create(@Body() order: CreateOrderRequest) {
        return this.createOrder.create({ orderId: 1, ...order })
    }

}