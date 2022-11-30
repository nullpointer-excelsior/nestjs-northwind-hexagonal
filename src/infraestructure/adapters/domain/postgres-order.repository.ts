import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Order } from "../../../core/domain/Order";
import { OrderRepository } from "../../../core/domain/ports/outbound/OrderRepository";
import { OrderDetailsEntity } from "../../persistence/northwind-database/entities/order-details.entity";
import { OrdersEntity } from "../../persistence/northwind-database/entities/orders.entity";
import { TransactionProvider } from "../../persistence/northwind-database/providers/transaction.provider";
import { OrderMapper } from "../mapper/OrderMapper";

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
    shipCountry: string;
    shipperId: number;
    customerId: string;
    employeeId: number;

}

@Injectable()
export class PostgresOrderRepository implements OrderRepository {

    constructor(
        private mapper: OrderMapper,
        private transaction: TransactionProvider,
        @InjectRepository(OrdersEntity) private repository: Repository<OrdersEntity>,
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
            shipName: order.shippingLocation.name,
            shipAddress: order.shippingLocation.address,
            shipCity: order.shippingLocation.city,
            shipRegion: order.shippingLocation.region,
            shipCountry: order.shippingLocation.country
        }

        await this.transaction.transacction(async (em: EntityManager) => {

            orderId = await this.saveOrder(em, orderValues)

            const detailsValues = order.details.map(detail => ({
                orderId: orderId,
                productId: detail.product.productId,
                unitPrice: detail.unitPrice.getValue(),
                quantity: detail.quantity,
                discount: detail.discount.getValue()
            }))
            await this.saveOrderDetails(em, orderId, detailsValues)

        })

        return orderId

    }

    async findById(id: number): Promise<Order> {
        
        const entity = await this.repository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.shipper', 'shipper')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.employee', 'employee')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.product', 'products')
            .where('order.orderId =:orderId', { orderId: id })
            .getOne()

        return this.mapper.map(entity)

    }

    async findBySlice(limit: number, offset: number): Promise<Order[]> {
        
        return await this.repository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.shipper', 'shipper')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.employee', 'employee')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.product', 'products')
            .take(limit)
            .skip(offset)
            .getMany()
            .then(entities => entities.map(e => this.mapper.map(e)))
        
    }
    
    count(): Promise<number> {
        return this.repository.count()
    }



}