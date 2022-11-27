import { Order } from "../../Order";

export interface OrderRepository {

    save(order: Order): Promise<number>
    findById(id: number): Promise<Order>

}