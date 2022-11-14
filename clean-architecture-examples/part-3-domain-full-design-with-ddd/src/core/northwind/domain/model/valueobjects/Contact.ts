import e from "express";
import { Email } from "../../../../domain/model/valueobjects/email";

export class Contact {

    public readonly email: Email;
    
    constructor(
        public readonly name: string, 
        public readonly title: string,
        public readonly phone: string,
        email: string,
    ) { 
        this.email = new Email(email)
    }

    getValues() {
        return {
            name: this.name,
            title: this.title,
            phone: this.phone,
            email: this.email.getValue()
        }
    }
}
