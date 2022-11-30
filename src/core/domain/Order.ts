import { Customer } from './Customer';
import { Detail } from './vo/Detail';
import { Employee } from "./Employee";
import { Shipper } from "./Shipper";
import { OrderId } from './vo/OrderID';
import { ShippingLocation } from './vo/ShippingLocation';
import { ShippingDto } from '../shared/dto/ShippingDto';


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