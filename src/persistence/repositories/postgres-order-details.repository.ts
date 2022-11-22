import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { OrderDetailsDto } from "../../core/shared/dto/CreateOrderDto";
import { OrderDetailsEntity } from "../northwind-database/entities/order-details.entity";

@Injectable()
export class PostgresOrderDetailsRepository {

    async save(manager: EntityManager, orderId: number, orderDetails: OrderDetailsDto[]) {
        
        const values = orderDetails.map(detail => ({
            orderId: orderId,
            productId: detail.productId,
            unitPrice: detail.unitPrice,
            quantity: detail.quantity,
            discount: detail.discount
        }))
        
        const resultDetails = await manager
            .createQueryBuilder()
            .insert()
            .into(OrderDetailsEntity)
            .values(values)
            .execute()

    }

}