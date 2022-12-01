import { Inject, Injectable } from "@nestjs/common";
import { SOUTHWIND_ORDER_REPOSITORY } from "../../../../infraestructure/adapters/adapters.module";
import { OrderCreated } from "../../../domain/events/OrderCreated";
import { Order } from "../../../domain/Order";
import { OrderRepository } from "../../../domain/ports/outbound/OrderRepository";
import { DomainEvent } from "../../../shared/DomainEvent";
import { DomainEventSubscriber } from "../../../shared/DomainEventSubscriber";

@Injectable()
export class SaveOrderForReadUseCase implements DomainEventSubscriber<Order> {

    constructor(@Inject(SOUTHWIND_ORDER_REPOSITORY) private order: OrderRepository) { }

    async onEvent(event: DomainEvent<Order>): Promise<void> {

        await this.order.save(event.getData())

    }

    suscribeTo(): string {
        return OrderCreated.EVENT_NAME
    }

}