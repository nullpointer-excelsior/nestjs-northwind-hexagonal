import { ApplicationException } from './ApplicationException';

export class CreateOrderException extends ApplicationException {
    
    constructor(message: string) {
        super(message)
    }

}