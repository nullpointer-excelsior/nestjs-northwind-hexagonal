import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOrderService } from "../../../core/application/services/CreateOrderService";
import { SearchOrderService } from "../../../core/application/services/SearchOrderService";
import { Order } from "../../../core/domain/entities/Order";
import { CreateOrderRequest } from "../model/create-order.request";


@ApiTags('Orders')
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

    @Post()
    async create(@Body() order: CreateOrderRequest) {
        return this.createOrder.create({ orderId: 1, ...order })
    }

}