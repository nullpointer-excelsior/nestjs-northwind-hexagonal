import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { Order } from "../../../core/Orders/domain/Order";
import { OrderRepository } from "../../../core/Orders/domain/ports/outbound/OrderRepository";
import { OrderDetailsEntity } from "../../persistence/northwind-database/entities/order-details.entity";
import { OrdersEntity } from "../../persistence/northwind-database/entities/orders.entity";
import { TransactionProvider } from "../../persistence/northwind-database/providers/transaction.provider";

export interface DetailValues {
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
}

export interface OrderValues {
    
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    shipperId: number;
    customerId: string;
    employeeId: number;
    
}

@Injectable()
export class OrderRepositoryAdapter implements OrderRepository {
    
    constructor(
        private transaction: TransactionProvider
    ) { }

    async saveOrder(manager: EntityManager, values: OrderValues) {
        
        const result = await manager
            .createQueryBuilder()
            .insert()
            .into(OrdersEntity)
            .values(values)
            .execute()
            
            return result.identifiers[0].orderId

    }

    async saveOrderDetails(manager: EntityManager, orderId: number, values: DetailValues[]) {

        return manager
            .createQueryBuilder()
            .insert()
            .into(OrderDetailsEntity)
            .values(values)
            .execute()

    }
    
    async save(order: Order): Promise<number> {
        
        let orderId = null

        const orderValues = {
            customerId: order.customer.customerId,
            employeeId: order.employee.employeeId,
            orderDate: order.orderDate,
            requiredDate: order.requiredDate,
            shippedDate: order.shippedDate,
            shipperId: order.shipper.shipperId,
            freight: order.freight,
            shipName: order.shipName,
            shipAddress: order.shipAddress,
            shipCity: order.shipCity,
            shipRegion: order.shipRegion,
            shipPostalCode: order.shipPostalCode,
            shipCountry: order.shipCountry
        }

        await this.transaction.transacction(async (em: EntityManager) => {

            orderId = await this.saveOrder(em, orderValues)

            const detailsValues = order.details.map(detail => ({
                orderId: orderId,
                productId: detail.product.productId,
                unitPrice: detail.unitPrice,
                quantity: detail.quantity,
                discount: detail.discount
            }))
            await this.saveOrderDetails(em, orderId, detailsValues)

        })

        return orderId
        
    }

}