import { OrderService } from "../domain/ports/inbound/OrderService"
import { CreateOrderDto } from "./dto/CreateOrderDto"
import { OrderCreatedDto } from "./dto/OrderCreatedDto"

export class PurchaseUseCases {

    constructor(private order: OrderService) { }

    async createOrder(createorder: CreateOrderDto): Promise<OrderCreatedDto>  {

        return this.order
            .createPartialOrder(createorder)
            .then(order => this.order.save(order))
            .then(orderId => this.order.findOrderCreatedById(orderId))

    }


}