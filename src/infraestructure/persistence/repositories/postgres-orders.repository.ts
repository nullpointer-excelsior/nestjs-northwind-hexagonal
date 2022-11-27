import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Order } from "../../../core/Orders/domain/Order";
import { CreateOrderDto, OrderDetailsDto } from "../../../core/shared/dto/CreateOrderDto";
import { OrderDetailsEntity } from "../northwind-database/entities/order-details.entity";
import { OrdersEntity } from "../northwind-database/entities/orders.entity";

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
    orderDetails: OrderDetailsDto[];
    
}
@Injectable()
export class PostgresOrdersRepository {

    constructor(@InjectRepository(OrdersEntity) private repository: Repository<OrdersEntity>) { }

    async saveOrder(manager: EntityManager, order: OrderValues) {
        
        const result = await manager
            .createQueryBuilder()
            .insert()
            .into(OrdersEntity)
            .values({
                customerId: order.customerId,
                employeeId: order.employeeId,
                orderDate: order.orderDate,
                requiredDate: order.requiredDate,
                shippedDate: order.shippedDate,
                shipperId: order.shipperId,
                freight: order.freight,
                shipName: order.shipName,
                shipAddress: order.shipAddress,
                shipCity: order.shipCity,
                shipRegion: order.shipRegion,
                shipPostalCode: order.shipPostalCode,
                shipCountry: order.shipCountry
            })
            .execute()
            
            return result.identifiers[0].orderId

    }

    async saveOrderDetails(manager: EntityManager, orderId: number, orderDetails: OrderDetailsDto[]) {

        const values = orderDetails.map(detail => ({
            orderId: orderId,
            productId: detail.productId,
            unitPrice: detail.unitPrice,
            quantity: detail.quantity,
            discount: detail.discount
        }))

        return manager
            .createQueryBuilder()
            .insert()
            .into(OrderDetailsEntity)
            .values(values)
            .execute()

    }

    // async findById(id: number): Promise<Order> {

    //     return this.repository
    //         .createQueryBuilder('order')
    //         .leftJoinAndSelect('order.shipper', 'shipper')
    //         .leftJoinAndSelect('order.customer', 'customer')
    //         .leftJoinAndSelect('order.employee', 'employee')
    //         .leftJoinAndSelect('order.orderDetails', 'orderDetails')
    //         .leftJoinAndSelect('orderDetails.product', 'products')
    //         .where('order.orderId =:orderId', { orderId: id })
    //         .getOne()

    // }

    async findAll(): Promise<Order[]> {
        return []
        // return this.repository
        //     .createQueryBuilder('order')
        //     .leftJoinAndSelect('order.shipper', 'shipper')
        //     .leftJoinAndSelect('order.customer', 'customer')
        //     .leftJoinAndSelect('order.employee', 'employee')
        //     .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        //     .leftJoinAndSelect('orderDetails.product', 'products').limit(100)
        //     .getMany()

    }

}