import { Customer } from './Customer';
import { Detail } from './vo/Detail';
import { Employee } from "./Employee";
import { Shipper } from "./Shipper";
import { OrderId } from './vo/OrderID';
import { ShippingLocation } from './vo/Shipping';



export class Order {

    orderId: OrderId;
    customer: Customer;
    employee: Employee;
    orderDate: Date;
    requiredDate: Date;
    shipper: Shipper;
    shippingLocation?: ShippingLocation;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    shippedDate: Date;
    freight: number;
    details: Detail[]


    createShipment(shipper: Shipper, freight: number) {
        this.shipper = shipper
        this.freight = freight
        this.shippedDate = new Date()
    }

    static createNewOrder(customer: Customer, employee: Employee, details: Detail[], shipping: ShippingLocation): Order {
        
        const order = new Order()
        order.orderDate = new Date()
        order.customer = customer
        order.employee = employee
        order.details = details
        order.shippingLocation = shipping
        
        return order
        
    }

    static createOrderFromPersistence(factory: (entityInstance: Order) => Order) {
        return factory(new Order())
    }

}