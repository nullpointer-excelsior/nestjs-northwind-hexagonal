import { DomainException } from "../error/DomainException";

export abstract class ValueObject<T> {

    protected abstract validate(value: T): boolean;

    constructor(private primitiveValue: T, errorMessage: string) {
        if (!this.validate(primitiveValue)) throw new DomainException(errorMessage)
    }

    getValue() {
        return this.primitiveValue
    }
}