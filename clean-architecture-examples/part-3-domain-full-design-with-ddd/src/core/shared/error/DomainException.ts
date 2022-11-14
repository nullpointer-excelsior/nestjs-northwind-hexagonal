export class DomainException extends Error {
    constructor(message: string) {
        super(message)
        this.message = message
        this.name = 'DomainException'
    }
}