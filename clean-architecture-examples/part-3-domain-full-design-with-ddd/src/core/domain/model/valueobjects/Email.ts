import { ValueObject } from "../../../shared/domain/ValueObject";


export class Email extends ValueObject<string> {
    
    constructor(email: string) { 
        super(email, `Invalid Email Address: ${email}`) 
    }

    validate(email: string) {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
    }
    
}