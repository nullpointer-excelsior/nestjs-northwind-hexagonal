import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { OrderDetail } from "./OrderDetail";
import { Shipper } from "./Shipper";


export class Order {

    orderId: number;
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    shipper: Shipper;
    customer: Customer;
    employee: Employee;
    orderDetails: OrderDetail[];

}