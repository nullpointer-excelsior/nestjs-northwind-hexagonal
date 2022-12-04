import { EventBase } from "../../../shared/DomainEvent";

export interface EventBusPublisher {
    publish(event: EventBase): void 
}