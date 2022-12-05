import { Customer } from './Customer';
import { Detail } from './vo/Detail';
import { Employee } from "./Employee";
import { Shipper } from "./Shipper";
import { OrderId } from './vo/OrderID';
import { ShippingLocation } from './vo/ShippingLocation';
import { ShippingDto } from '../shared/dto/ShippingDto';
import { OrderSummary } from './vo/OrderSummary';


export class Order {

    orderId: OrderId;
    customer: Customer;
    employee: Employee;
    orderDate: Date;
    requiredDate: Date;
    shipper: Shipper;
    shippingLocation: ShippingLocation;
    shippedDate: Date;
    freight: number;
    details: Detail[]

    getSummary(): OrderSummary {
        return {
            orderId: this.orderId,
            orderDate: this.orderDate,
            customer: this.customer,
            employee: this.employee,
            shipping: this.shippingLocation,
            details: this.details.map(detail => {
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
        }
    }

    static createNewOrder(customer: Customer, employee: Employee, details: Detail[], shipping: ShippingDto): Order {

        const order = new Order()
        order.orderDate = new Date()
        order.customer = customer
        order.employee = employee
        order.details = details
        order.shippingLocation = shipping.destination
        order.shipper = shipping.shipper
        order.freight = shipping.freight
        order.shippedDate = shipping.shippedDate

        return order

    }

    static createOrderFromPersistence(factory: (entityInstance: Order) => Order) {
        return factory(new Order())
    }

}