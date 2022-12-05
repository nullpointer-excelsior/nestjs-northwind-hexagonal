import { Injectable } from "@nestjs/common";
import { Order } from "../../../core/domain/Order";
import { Mapper } from "../../../core/shared/Mapper";
import { OrdersEntity } from "../../persistence/northwind-database/entities/orders.entity";
import { DetailsMapper } from "./DetailsMapper";

@Injectable()
export class OrderMapper implements Mapper<OrdersEntity, Order> {
    
    constructor(private details: DetailsMapper) {}

    map(entity: OrdersEntity): Order {
        
        const order = new Order()
        order.orderId = entity.orderId
        order.customer = entity.customer
        order.employee = entity.employee
        order.shipper = entity.shipper
        order.details = this.details.map(entity.orderDetails)
        order.freight = entity.freight
        order.orderDate = entity.orderDate
        order.requiredDate = entity.requiredDate
        order.shippedDate = entity.shippedDate
        order.shippingLocation = {
            name: entity.shipName,
            address: entity.shipAddress,
            city: entity.shipCity,
            region: entity.shipRegion,
            country: entity.shipCountry
        }

        return order
    }

}