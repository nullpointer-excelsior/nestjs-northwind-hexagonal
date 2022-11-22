import { Order } from "../domain/entities/Order";
import { CreateOrderDto } from "../shared/dto/CreateOrderDto";

export interface CreateOrder {

    create(order: CreateOrderDto): Promise<Order>

}