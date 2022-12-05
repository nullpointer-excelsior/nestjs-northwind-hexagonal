export type EventId = string
export type EventName = string;
import { v4 as uuidv4 } from 'uuid';


function generateId() {
    return new uuidv4()
}

export abstract class EventBase {

    constructor(readonly eventId: EventId, readonly ocurredOn: Date) { }

    abstract getName(): EventName;

}

export abstract class DomainEvent<T> extends EventBase {

    constructor(private readonly data: T) {
        super(generateId(), new Date())
    }

    getData(): T {
        return this.data
    }

}