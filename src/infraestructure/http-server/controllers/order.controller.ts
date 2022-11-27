import { Body, Controller, Get, Inject, Logger, Post, UseFilters } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CREATE_ORDER_USER_USE_CASE } from "../../../core/core.module";
import { CreateOrderUseCase } from "../../../core/Orders/application/CreateOrderUseCase";
import { Order } from "../../../core/Orders/domain/Order";
import { GlobalExceptionFilter } from "../exception-filters/global-exception.filter";
import { CreateOrderRequest } from "../model/create-order.request";


@ApiTags('Orders')
@UseFilters(GlobalExceptionFilter)
@Controller('/order')
export class OrderController {

    // constructor(
    //     private searchOrder: SearchOrderService,
    //     private createOrder: CreateOrderService
    // ) {}

    // @ApiInternalServerErrorResponse({ description: 'Error server'})
    // @ApiResponse({ description: "Northwind's orders", type: Array<Order> })
    // @Get()
    // async getOrders(): Promise<Order[]> {
    //     return this.searchOrder.findAll()
    // }

    // @ApiInternalServerErrorResponse({ description: 'Error server'})
    // @ApiResponse({ description: "Order Created", type: Order })
    // @Post()
    // async create(@Body() order: CreateOrderRequest) {
    //     // console.log(order)
    //     return this.createOrder.create({ orderId: 1, ...order })
    // }

    constructor(private createOrder: CreateOrderUseCase) {

    }
    
    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Order Created", type: Order })
    @Post()
    async create(@Body() order: CreateOrderRequest) {
        // console.log(order)
        return this.createOrder.create({
            ...order,
            details: order.orderDetails
        })
    }

}