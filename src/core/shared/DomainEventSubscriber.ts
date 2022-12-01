import {EventName, EventBase, DomainEvent } from './DomainEvent'; 

export interface EventSubscriber {

    suscribeTo(): EventName;
    onEvent(event: EventBase): void;

}

export interface DomainEventSubscriber<T> extends EventSubscriber {

    onEvent(event: DomainEvent<T>): void | Promise<void>;
    
}