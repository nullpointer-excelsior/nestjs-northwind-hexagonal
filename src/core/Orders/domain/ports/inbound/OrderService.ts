import { Order } from "../../Order";
import { CustomerRepository } from "../outbound/CustomerRepository";
import { EmployeeRepository } from "../outbound/EmployeeRepository";
import { OrderRepository } from "../outbound/OrderRepository";
import { ShipperRepository } from "../outbound/ShipperRepository";
import { DetailService } from "./DetailService";

export interface OrderDTO {
    customerId: string;
    employeeId: number;
    shipperId: number;
    requiredDate: Date;
    shippedDate: Date;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    details: DetailDTO[];
}

export interface DetailDTO {
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
}

export class OrderService {

    constructor(
        private readonly order: OrderRepository,
        private readonly customer: CustomerRepository,
        private readonly employee: EmployeeRepository,
        private readonly shipper: ShipperRepository,
        private readonly detail: DetailService
    ) {}

    async create(dto: OrderDTO): Promise<Order> {
        
        const order = new Order()

        order.customer = await this.customer.findById(dto.customerId)
        order.employee = await this.employee.findById(dto.employeeId)
        order.shipper = await this.shipper.findById(dto.shipperId)
        order.details = await this.detail.enrichProductDetails(dto.details)

        order.freight = dto.freight
        order.orderDate = new Date()
        order.requiredDate = dto.requiredDate
        order.shipAddress = dto.shipAddress
        order.shipCity = dto.shipCity
        order.shipCountry = dto.shipCountry
        order.shipName = dto.shipName
        order.shipPostalCode = dto.shipPostalCode
        order.shipRegion = dto.shipRegion
        order.shippedDate = dto.shippedDate

        return order

    }

    async save(order: Order): Promise<number> {
        return this.order.save(order)
    }

}