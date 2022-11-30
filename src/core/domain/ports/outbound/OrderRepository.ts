import { Order } from "../../Order";

export interface OrderRepository {

    save(order: Order): Promise<number>
    findById(id: number): Promise<Order>
    findBySlice(limit: number, oofset: number): Promise<Order[]>
    count(): Promise<number>
}