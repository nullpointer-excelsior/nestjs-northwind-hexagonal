import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomerRepository } from "../../../core/domain/ports/outbound/customerRepository";
import { Customer } from "../../../core/domain/Customer";
import { CustomerDocument } from "../../persistence/southwind-database/model/customer.schema";

@Injectable()
export class MongoCustomerRepository implements CustomerRepository {

    constructor(@InjectModel('Customer') private model: Model<CustomerDocument>) { }

    async findById(id: number): Promise<Customer> {
        return this.model
            .findOne({ customerId: id })
            .exec()
            .then(doc => this.map(doc));
    }

    async count() {
        return this.model.count()
    }

    async save(c: Customer){
        const customer = new this.model({
            ...c
        })
        await customer.save()
    }



    map(doc: CustomerDocument) {
        const c = new Customer()
        return {
            ...c
        } as Customer
    }
}