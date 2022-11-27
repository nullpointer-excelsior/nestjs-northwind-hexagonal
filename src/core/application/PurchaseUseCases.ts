import { OrderDTO, OrderService } from "../domain/ports/inbound/OrderService"

export class PurchaseUseCases {
     
    constructor(private order: OrderService) {}

    async createOrder(createorder: OrderDTO) {
        const order = await this.order.create(createorder)
        await this.order.save(order)
    }
    

    getOrders() {}

}