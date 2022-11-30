import { OrderCreated } from "../../domain/events/OrderCreated"
import { OrderService } from "../../domain/ports/inbound/OrderService"
import { DomainEventBus } from "../../shared/DomainEventBus"
import { CreateOrderDto } from "../../shared/dto/CreateOrderDto"
import { OrderCreatedDto } from "../../shared/dto/OrderCreatedDto"


export class PurchaseUseCases {

    constructor(
        private order: OrderService,
        private eventbus: DomainEventBus
    ) { }

    async createOrder(createorder: CreateOrderDto): Promise<OrderCreatedDto>  {

        return this.order.create(createorder) // creating an order instance
            .then(order => this.order.save(order)) // save to database
            .then(order => {
                this.eventbus.publish(new OrderCreated(order))
                return order
            })
            .then(order => ({
                orderId: order.orderId,
                orderDate: order.orderDate,
                customer: order.customer,
                employee: order.employee,
                shipping: order.shippingLocation,
                details: order.details.map(detail => {
                    return {
                        product: {
                            productId: detail.product.productId,
                            productName: detail.product.productName
                        },
                        unitPrice: detail.unitPrice.getValue(),
                        quantity: detail.quantity,
                        discount: detail.discount.getValue()
                    }
                })
            }))
            //.then(order => this.order.findOrderCreatedById(order.orderId)) // retrieve a response

    }


}