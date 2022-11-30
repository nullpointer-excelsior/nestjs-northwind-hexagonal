import { CreateDetailDTO, CreateOrderDto } from "../../../shared/dto/CreateOrderDto";
import { OrderCreatedDto } from "../../../shared/dto/OrderCreatedDto";
import { EntityNotFoundException } from "../../../shared/exception/EntityNotFoundException";
import { Order } from "../../Order";
import { Detail } from "../../vo/Detail";
import { OrderId } from "../../vo/OrderID";
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
                details: order.details.map(detail => {
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
            }))
    }

}