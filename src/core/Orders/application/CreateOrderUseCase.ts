import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../domain/Order";
import { DetailService } from "../domain/ports/inbound/DetailService";
import { OrderDTO, OrderService } from "../domain/ports/inbound/OrderService";
import { CustomerRepository } from "../domain/ports/outbound/CustomerRepository";
import { EmployeeRepository } from "../domain/ports/outbound/EmployeeRepository";
import { OrderRepository } from "../domain/ports/outbound/OrderRepository";
import { ShipperRepository } from "../domain/ports/outbound/ShipperRepository";

export class CreateOrderUseCase {


    constructor(private order: OrderService) {}

    async create(createorder: OrderDTO) {
        const order = await this.order.create(createorder)
        await this.order.save(order)
    }
    // constructor(
    //     private order: OrderRepository,
    //     private customer: CustomerRepository,
    //     private employee: EmployeeRepository,
    //     private shipper: ShipperRepository,
    //     private detail: DetailService,
    // ) { }

    // async create(createorder: OrderDTO) {

    //     const customer = await this.customer.findById(createorder.customerId)
    //     const employee = await this.employee.findById(createorder.employeeId)
    //     const shipper = await this.shipper.findById(createorder.shipperId)
    //     const details = await this.detail.enrichProductDetails(createorder.details)

    //     const order = new Order()
    //     order.customer = customer
    //     order.employee = employee
    //     order.shipper = shipper
    //     order.details = details
    //     order.orderDate = new Date()
    //     order.requiredDate = createorder.requiredDate
    //     order.shipAddress = createorder.shipAddress
    //     order.shipCity = createorder.shipCity
    //     order.shipCountry = createorder.shipCountry
    //     order.shipName = createorder.shipName
    //     order.shipPostalCode = createorder.shipPostalCode
    //     order.shipRegion = createorder.shipRegion
    //     order.shippedDate = createorder.shippedDate

    //     const orderId = await this.order.save(order)
    //     console.log('ORDER_ID', orderId)

    // }

    // async createOrder(createorder: OrderDTO) {

    //     const order = new Order()

    //     order.customer = await this.customer.findById(createorder.customerId)
    //     order.employee = await this.employee.findById(createorder.employeeId)
    //     order.shipper = await this.shipper.findById(createorder.shipperId)
    //     order.details = await this.detail.enrichProductDetails(createorder.details)
        
    //     order.orderDate = new Date()
    //     order.requiredDate = createorder.requiredDate
    //     order.shipAddress = createorder.shipAddress
    //     order.shipCity = createorder.shipCity
    //     order.shipCountry = createorder.shipCountry
    //     order.shipName = createorder.shipName
    //     order.shipPostalCode = createorder.shipPostalCode
    //     order.shipRegion = createorder.shipRegion
    //     order.shippedDate = createorder.shippedDate

    //     return order
    // }

}