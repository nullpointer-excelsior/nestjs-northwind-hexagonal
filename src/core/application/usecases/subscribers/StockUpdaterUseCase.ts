import { Injectable } from "@nestjs/common"
import { OrderCreated } from "../../../domain/events/OrderCreated"
import { Order } from "../../../domain/Order"
import { ProductService } from "../../../domain/services/ProductService"
import { DomainEvent } from "../../../shared/DomainEvent"
import { DomainEventSubscriber } from "../../../shared/DomainEventSubscriber"

@Injectable()
export class StockUpdaterUseCase implements DomainEventSubscriber<Order> {

    constructor(private product: ProductService) {}

    async onEvent(event: DomainEvent<Order>) {
        
        for (let detail of event.getData().details) {
            await this.product.updateProductStock(detail.product.productId, detail.quantity)
        }
        
    }

    suscribeTo(): string {
        return OrderCreated.EVENT_NAME
    }

}