import { OrderDTO, OrderService } from "../domain/ports/inbound/OrderService"

export class PurchaseUseCases {

    constructor(private order: OrderService) { }

    async createOrder(createorder: OrderDTO) {
        
        return this.order
            .create(createorder)
            .then(order => this.order.save(order))
            .then(orderId => this.order.findById(orderId))

    }


    getOrders() { }

}