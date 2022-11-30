import { EventSubscriber } from './DomainEventSubscriber';
import  { EventBase } from './DomainEvent'

export interface DomainEventBus {

    subscribe(subscriber: EventSubscriber): void;
    publish(event: EventBase): void;
    
}