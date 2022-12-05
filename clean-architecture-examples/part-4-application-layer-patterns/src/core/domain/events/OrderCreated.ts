import { DomainEvent } from "../../shared/DomainEvent"
import { Order } from "../Order"

export class OrderCreated extends DomainEvent<Order> {

    static EVENT_NAME = 'northwind-app.order-created'
    
    constructor(order: Order) {
        super(order)
    }

    getName(): string {
        return OrderCreated.EVENT_NAME
    }

}