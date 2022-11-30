import { Inject, Injectable, Scope } from "@nestjs/common";
import { CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from "../../../../infraestructure/adapters/adapters.module";
import { CreateDetailDTO } from "../../../application/dto/CreateOrderDto";
import { EntityNotFoundException } from "../../../shared/exception/EntityNotFoundException";
import { Order } from "../../Order";
import { Detail } from "../../vo/Detail";
import { CustomerRepository } from "../outbound/CustomerRepository";
import { EmployeeRepository } from "../outbound/EmployeeRepository";
import { ProductRepository } from "../outbound/ProductRepository";
import { ShipperRepository } from "../outbound/ShipperRepository";

@Injectable({ scope: Scope.REQUEST})
export class OrderBuilder {

    newOrder: Order = new Order()

    constructor(
        @Inject(CUSTOMER_REPOSITORY) private readonly customer: CustomerRepository,
        @Inject(EMPLOYEE_REPOSITORY) private readonly employee: EmployeeRepository,
        @Inject(SHIPPER_REPOSITORY) private readonly shipper: ShipperRepository,
        @Inject(PRODUCT_REPOSITORY) private readonly product: ProductRepository
    ) { 
    }

    async asyncBuilder() {
        return new Builder(
            new Order(),
            this.customer,
            this.employee, 
            this.shipper, 
            this.product
        )
    }

}

export class Builder {

    constructor(
        private order: Order,
        private customerRepository: CustomerRepository,
        private employeeRepository: EmployeeRepository,
        private shipperRepository: ShipperRepository,
        private productRepository: ProductRepository
    ) { }

    async customer(customerId: any) {
        const customer = await this.customerRepository.findById(customerId)
        if (!customer) {
            throw new EntityNotFoundException(`Customer(id="${customerId}") Not found`)
        }
        this.order.customer = customer
        return this 
    }

    async employee(employeeId: any) {
        const employee = await this.employeeRepository.findById(employeeId)
        if (!employee) {
            throw new EntityNotFoundException(`Employee(id="${employeeId}") Not found`)
        }
        this.order.employee = employee
        return this 
    }

    async shipper(shipperId: any) {
        const shipper = await this.shipperRepository.findById(shipperId)
        if (!shipper) {
            throw new EntityNotFoundException(`Shipper(id="${shipperId}") Not found`)
        }
        this.order.shipper = shipper
        return this 
    }

    async details(detailsdto: CreateDetailDTO[]) {
        const details: Detail[] = []
        for (let detail of detailsdto) {
            const entity = new Detail({
                product: await this.productRepository.findById(detail.productId),
                unitPrice: detail.quantity,
                discount: detail.discount,
                quantity: detail.quantity
            })
            details.push(entity)
        }
        this.order.details = details
        return this
    }

    async build() {
        return this.order
    }

}
