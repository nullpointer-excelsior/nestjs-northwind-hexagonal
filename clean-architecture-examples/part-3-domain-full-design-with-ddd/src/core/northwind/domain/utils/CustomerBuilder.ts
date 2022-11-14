import { Customer } from "../model/entities/Customer"
import { UserCustomer } from "../model/entities/UserCustomer"
import { Contact } from "../model/valueobjects/Contact"
import { Locality } from "../model/valueobjects/Locality"
import { Id } from "../../../shared/domain/valueobjects/Id"

export class CustomerBuilder {

    private customer = new Customer()

    id(id: Id | string) {
        this.customer.id = typeof id === 'string' ? new Id(id) : id
        return this
    }

    companyName(name: string) {
        this.customer.companyName = name
        return this
    }

    contact(values: { name: string, title: string, email: string, phone: string }) {
        this.customer.contact = new Contact(values.name, values.title, values.phone, values.email)
        return this
    }

    locality(values: { address: string, city: string, region: string, country: string }) {
        this.customer.locality = new Locality(values.address, values.city, values.region, values.country)
        return this
    }

    user(user: UserCustomer) {
        this.customer.asignUser(user)
        return this
    }

    build() {
        return this.customer
    }
}