import { CreateDetailDTO, CreateOrderDto } from "../../../application/dto/CreateOrderDto";
import { OrderCreatedDto } from "../../../application/dto/OrderCreatedDto";
import { EntityNotFoundException } from "../../../shared/exception/EntityNotFoundException";
import { Order } from "../../Order";
import { Detail } from "../../vo/Detail";
import { OrderId } from "../../vo/OrderID";
import { ShippingLocation } from "../../vo/Shipping";
import { CustomerRepository } from "../outbound/CustomerRepository";
import { EmployeeRepository } from "../outbound/EmployeeRepository";
import { OrderRepository } from "../outbound/OrderRepository";
import { ProductRepository } from "../outbound/ProductRepository";
import { ShipperRepository } from "../outbound/ShipperRepository";

export class OrderService {

    constructor(
        private readonly order: OrderRepository,
        private readonly customer: CustomerRepository,
        private readonly employee: EmployeeRepository,
        private readonly shipper: ShipperRepository,
        private readonly product: ProductRepository
    ) { }

    async createPartialOrder(dto: CreateOrderDto) {

        const customer = await this.getCustomer(dto.customerId)
        const employee = await this.getEmployee(dto.employeeId)
        const details = await this.getProductDetail(dto.details)
        const destination: ShippingLocation = {
            name: dto.shipName,
            address: dto.shipAddress,
            city: dto.shipCity,
            region: dto.shipRegion,
            country: dto.shipCountry,
        }

        return Order.createNewOrder(customer, employee, details, destination)

    }

    async create(dto: CreateOrderDto): Promise<Order> {

        let order = new Order()

        order.customer = await this.getCustomer(dto.customerId)
        order.employee = await this.getEmployee(dto.employeeId)
        order.shipper = await this.getShipper(dto.shipperId)
        order.details = await this.getProductDetail(dto.details)

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

    async save(order: Order): Promise<OrderId> {
        return this.order.save(order)
    }

    async findOrderCreatedById(id: OrderId): Promise<OrderCreatedDto> {
        return this.order
            .findById(id)
            .then(order => ({
                orderId: order.orderId,
                orderDate: order.orderDate,
                customer: order.customer,
                employee: order.employee,
                shipping: order.shippingLocation,
                details: order.details.map(detail =>{
                    return {
                        product: {
                            productId: detail.product.productId,
                            productName: detail.product.productName
                        },
                        unitPrice: detail.unitPrice.getValue(),
                        quantity: detail.quantity,
                        discount: detail.discount.getValue()
                    }
                } )
            }))
    }

}