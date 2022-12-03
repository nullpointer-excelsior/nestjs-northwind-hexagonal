import { Injectable } from "@nestjs/common";
import { Order } from "../../../core/domain/Order";
import { OrderRepository } from "../../../core/domain/ports/outbound/OrderRepository";
import { MongoOrderRepository } from "./mongo-order.repository";
import { PostgresOrderRepository } from "./postgres-order.repository";

@Injectable()
export class OrderRepositoryFacade implements OrderRepository {

    constructor(
        private mongo: MongoOrderRepository,
        private postgres: PostgresOrderRepository
    ) { }

    findById(id: number): Promise<Order> {
        return this.postgres.findById(id)
    }

    findBySlice(limit: number, offset: number): Promise<Order[]> {
        return this.mongo.findBySlice(limit, offset)
    }

    count(): Promise<number> {
        return this.mongo.count()
    }

    save(order: Order): Promise<number> {
        return this.postgres.save(order)
    }

}