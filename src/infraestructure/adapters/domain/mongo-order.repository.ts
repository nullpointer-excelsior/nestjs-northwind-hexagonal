import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../../../core/domain/Customer";
import { Employee } from "../../../core/domain/Employee";
import { Order } from "../../../core/domain/Order";
import { OrderRepository } from "../../../core/domain/ports/outbound/OrderRepository";
import { Product } from "../../../core/domain/Product";
import { Detail } from "../../../core/domain/vo/Detail";
import { ShippingLocation } from "../../../core/domain/vo/ShippingLocation";
import { OrderDocument } from "../../persistence/southwind-database/model/order.schema";


@Injectable()
export class MongoOrderRepository implements OrderRepository {

    constructor(@InjectModel('Order') private model: Model<OrderDocument>) {}

    async save(order: Order): Promise<number> {
        const orderCreated = new this.model({
            ...order,
            details: order.getSummary().details
        });
        await orderCreated.save()
        return order.orderId
    }

    async findById(id: number): Promise<Order> {
        return this.model
            .findOne({ orderId: id })
            .exec()
            .then(doc => this.map(doc));
    }

    async findBySlice(limit: number, offset: number): Promise<Order[]> {
        return this.model
            .find()
            .skip(offset)
            .limit(limit)
            .exec()
            .then(docs => docs.map(doc => this.map(doc)));
    }

    async count(): Promise<number> {
        return this.model
            .find()
            .count()
            .exec();
    }

    map(doc: OrderDocument) {
       
        const order = new Order()
        order.orderDate = new Date()
        
        order.customer = doc.customer as Customer
        order.employee = doc.employee as Employee
       
        order.details = doc.details.map(d => new Detail({
            discount: d.discount,
            product: d.product as Product,
            quantity: d.quantity,
            unitPrice: d.unitPrice
        }))

        order.shipper = {
            shipperId:+doc.shipper.shipperId ,
            companyName:doc.shipper.companyName.toString(),
            phone:doc.shipper.phone
        }

        order.shippingLocation = new ShippingLocation (
            doc.shippingLocation.name,
            doc.shippingLocation.address,
            doc.shippingLocation.city,
            doc.shippingLocation.region,
            doc.shippingLocation.country,
        )
        order.freight = doc.freight
        order.shippedDate = doc.shippedDate

        return order
    }

}