import { Injectable, Logger } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { TransactionProvider } from "../../../infraestructure/persistence/northwind-database/providers/transaction.provider";
import { PostgresOrdersRepository } from "../../../infraestructure/persistence/repositories/postgres-orders.repository";
import { Order } from "../../domain/entities/Order";
import { CreateOrderDto } from "../../shared/dto/CreateOrderDto";
import { CreateOrderException } from "../../shared/exception/CreateOrderException";

@Injectable()
export class CreateOrderService {

    constructor(
        private orders: PostgresOrdersRepository,
        private transaction: TransactionProvider
    ) { }

    async generateOrderId() {
        return this.orders
            .findMaxOrderId()
            .then(max => max + 1)
    }

    async create(order: CreateOrderDto): Promise<Order> {

        try {

            const orderId = await this.generateOrderId()
            const neworder = {
                ...order,
                orderId: orderId -1
            }

            await this.transaction.transacction(async (em: EntityManager) => {

                await this.orders.saveOrder(em, neworder)
                await this.orders.saveOrderDetails(em, orderId, neworder.orderDetails)
                
            })

            return this.orders.findById(orderId)

        } catch (error) {
            throw new CreateOrderException('Error creating Order')
        }

    }

}