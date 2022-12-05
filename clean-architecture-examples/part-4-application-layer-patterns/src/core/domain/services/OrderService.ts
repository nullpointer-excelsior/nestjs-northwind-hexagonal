import { DomainEventBus } from "../../shared/DomainEventBus";
import { CreateDetailDTO, CreateOrderDto } from "../../shared/dto/CreateOrderDto";
import { EntityNotFoundException } from "../../shared/exception/EntityNotFoundException";
import { OrderCreated } from "../events/OrderCreated";
import { Order } from "../Order";
import { Detail } from "../vo/Detail";
import { CustomerRepository } from "../ports/outbound/CustomerRepository";
import { EmployeeRepository } from "../ports/outbound/EmployeeRepository";
import { OrderRepository } from "../ports/outbound/OrderRepository";
import { ProductRepository } from "../ports/outbound/ProductRepository";
import { ShipperRepository } from "../ports/outbound/ShipperRepository";
import { EventBusPublisher } from "../ports/inbound/EventBusPublisher";

export class OrderService {

    constructor(
        private readonly order: OrderRepository,
        private readonly customer: CustomerRepository,
        private readonly employee: EmployeeRepository,
        private readonly shipper: ShipperRepository,
        private readonly product: ProductRepository,
        private readonly eventbus: EventBusPublisher
    ) { }

    async create(createorder: CreateOrderDto) {

        const customer = await this.getCustomer(createorder.customerId)
        const employee = await this.getEmployee(createorder.employeeId)
        const details = await this.getProductDetail(createorder.details)

        const shipping = {
            shipper: await this.getShipper(createorder.shipperId),
            freight: createorder.freight,
            shippedDate: createorder.shippedDate,
            destination: {
                name: createorder.shipName,
                address: createorder.shipAddress,
                city: createorder.shipCity,
                region: createorder.shipRegion,
                country: createorder.shipCountry,
            }
        }

        return Order.createNewOrder(customer, employee, details, shipping)

    }

    async getCustomer(customerId: any) {
        const customer = await this.customer.findById(customerId)
        if (!customer) {
            throw new EntityNotFoundException(`Customer(id="${customerId}") Not found`)
        }
        return customer
    }

    async getEmployee(employeeId: any) {
        const employee = await this.employee.findById(employeeId)
        if (!employee) {
            throw new EntityNotFoundException(`Employee(id="${employeeId}") Not found`)
        }
        return employee
    }

    async getShipper(shipperId: any) {
        const shipper = await this.shipper.findById(shipperId)
        if (!shipper) {
            throw new EntityNotFoundException(`Shipper(id="${shipperId}") Not found`)
        }
        return shipper
    }

    async getProduct(productId: any) {
        const product = await this.product.findById(productId)
        if (!product) {
            throw new EntityNotFoundException(`Product(id="${productId}") Not found`)
        }
        return product
    }

    async getProductDetail(detailsdto: CreateDetailDTO[]) {
        const details: Detail[] = []
        for (let detail of detailsdto) {
            const entity = new Detail({
                product: await this.getProduct(detail.productId),
                unitPrice: detail.quantity,
                discount: detail.discount,
                quantity: detail.quantity
            })
            details.push(entity)
        }
        return details
    }

    async save(order: Order): Promise<Order> {
        return this.order
            .save(order)
            .then(orderId => {
                order.orderId = orderId
                return order
            })
            .then(order => {
                this.eventbus.publish(new OrderCreated(order))
                return order
            })
    }

    async getOrdersSlice(limit: number, offset: number) {
        return this.order.findBySlice(limit, offset)
    }

    async getOrdersCount() {
        return this.order.count()
    }

}