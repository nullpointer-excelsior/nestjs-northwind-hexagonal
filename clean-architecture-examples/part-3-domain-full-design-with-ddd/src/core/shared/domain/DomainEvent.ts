import { Id } from './valueobjects/Id';

export type EventName = string;

export abstract class EventBase {

    constructor(readonly eventId: string, readonly ocurredOn: Date) { }

    abstract getName(): EventName;

}

export abstract class DomainEvent<T> extends EventBase {

    constructor(private readonly data: T) {
        super(Id.string(), new Date())
    }

    getData(): T {
        return this.data
    }

}