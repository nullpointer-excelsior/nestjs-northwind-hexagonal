import { EventBase } from "./DomainEvent";

export abstract class AggregateRoot {

    private events: EventBase[] = []

    record(event: EventBase) {
        this.events.push(event)
    }

    pullEvents() {
        const domainEvents = this.events.slice();
        this.events = [];
        return domainEvents;
    }
}