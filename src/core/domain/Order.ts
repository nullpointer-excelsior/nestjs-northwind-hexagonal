import { Customer } from './Customer';
import { Detail } from './Detail';
import { Employee } from "./Employee";
import { Shipper } from "./Shipper";

export class Order {

    orderId?: number;
    customer: Customer;
    employee: Employee;
    orderDate: Date;
    requiredDate: Date;
    shipper: Shipper;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;  
    shippedDate: Date;
    freight: number;
    details: Detail[]
    

    equalsTo(e: Order): boolean {
        return this.orderId === e.orderId
    }

}