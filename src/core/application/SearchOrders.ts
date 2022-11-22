import { Order } from "../domain/entities/Order";

export interface SearchOrders {

    findAll(): Promise<Order[]>;

}