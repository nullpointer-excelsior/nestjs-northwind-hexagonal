import { Injectable } from "@nestjs/common";
import { EventBase } from "../../../core/shared/DomainEvent";
import { EventSubscriber } from "../../../core/shared/DomainEventSubscriber";
import { DomainEventBus } from "../../../core/shared/DomainEventBus";

@Injectable()
export class InMemoryEventBus implements DomainEventBus {

    private subscribers: EventSubscriber[] = []

    subscribe(subscriber: EventSubscriber): void {
        this.subscribers.push(subscriber)
    }

    publish(event: EventBase): void {
        this.subscribers
            .filter(subscriber => subscriber.suscribeTo() === event.getName())
            .forEach(subscriber => subscriber.onEvent(event))
    }

}