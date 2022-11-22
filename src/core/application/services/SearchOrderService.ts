import { Injectable } from "@nestjs/common";
import { PostgresOrdersRepository } from "../../../infraestructure/persistence/repositories/postgres-orders.repository";
import { Order } from "../../domain/entities/Order";

@Injectable()
export class SearchOrderService {

    constructor(private orders: PostgresOrdersRepository) { }

    findAll(): Promise<Order[]> {
        return this.orders.findAll()
    }

}