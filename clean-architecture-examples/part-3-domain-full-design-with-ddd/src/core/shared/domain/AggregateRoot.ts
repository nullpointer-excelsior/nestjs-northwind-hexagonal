import { Id } from "./valueobjects/Id";

export abstract class AggregateRoot<T> {
    
    id: Id;

    abstract equalsTo(e: T): boolean;

}