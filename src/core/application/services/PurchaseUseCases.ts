import { OrderService } from "../../domain/ports/inbound/OrderService"
import { CreateOrderDto } from "../../shared/dto/CreateOrderDto"
import { OrderCreatedDto } from "../../shared/dto/OrderCreatedDto"


export class PurchaseUseCases {

    constructor(private order: OrderService) { }

    async createOrder(createorder: CreateOrderDto): Promise<OrderCreatedDto>  {

        return this.order.create(createorder) // creating an order instance
            .then(order => this.order.save(order)) // save to database
            .then(order => order.getSummary()) // return summary

    }


}