export abstract class Factory<T, S> {

    constructor(protected input: T) {}

    abstract create(entity: S): S

}
