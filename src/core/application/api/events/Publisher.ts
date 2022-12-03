import { EventBase } from "../../../shared/DomainEvent";

export interface Publisher {
    publish(event: EventBase): void;
}