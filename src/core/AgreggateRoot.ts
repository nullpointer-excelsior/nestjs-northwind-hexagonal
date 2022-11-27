export abstract class AggregateRoot<T> {

    abstract equalsTo(e: T): boolean;
}