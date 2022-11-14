import { AggregateRoot } from "../../../../shared/domain/AggregateRoot";
import { CustomerBuilder } from "../../utils/CustomerBuilder";
import { CreateNewCustomerDto } from "../../../../shared/dto/CreateNewCustomerDto";
import { DomainException } from "../../../../shared/error/DomainException";
import { Contact } from "../valueobjects/Contact";
import { Locality } from "../valueobjects/Locality";
import { UserCustomer } from "./UserCustomer";

export class Customer extends AggregateRoot<Customer> {
    
    companyName: string;
    contact: Contact;
    locality: Locality;
    get user(): UserCustomer { 
        return this._user 
    }
    private _user: UserCustomer;

    static createNewCustomer(createCustomer: CreateNewCustomerDto){
        
        const contact = {
            name: createCustomer.contactName,
            title: createCustomer.contactTitle,
            email: createCustomer.contactEmail,
            phone: createCustomer.contactPhone
        }
        const locality = {
            address: createCustomer.localityAddress,
            city: createCustomer.localityCity,
            region: createCustomer.localityRegion,
            country: createCustomer.localityCountry
        }
        const customer = new CustomerBuilder()
            .companyName(createCustomer.companyName)
            .contact(contact)
            .locality(locality)
            .build()
        customer.asignUser(createCustomer.user)

        return customer

    }

    asignUser(user: UserCustomer) {
        if (user.email.getValue() === this.getEmail().getValue()) {
            this._user = user
        }
        throw new DomainException(`Invalid ${user.email.getValue()} email for Customer(id="${this.id}")`)
    }

    getEmail() {
        return this.contact.email
    }

    equalsTo(e: Customer): boolean {
        return this.id.getValue() === e.id.getValue()
    }

}

