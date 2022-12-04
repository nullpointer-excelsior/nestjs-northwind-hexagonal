import { Order } from "../../domain/Order";
import { OrderService } from "../../domain/services/OrderService";
import { CreateOrderDto } from "../../shared/dto/CreateOrderDto";
import { OrderCreatedDto } from "../../shared/dto/OrderCreatedDto";
import { Paginated } from "../utils/Paginated";

export interface GetOrdersRequest {
    page: number;
    size: number;   
}

export interface GetOrdersResponse {
    data: Order[];
    totalRecords: number;
    pageSize: number;
    totalPages: number;
    currentPage: number;  
}

export class PurchaseUseCases {

    constructor(private order: OrderService) { }

    async createOrder(createorder: CreateOrderDto): Promise<OrderCreatedDto>  {

        return this.order.create(createorder) // creating an order instance
            .then(order => this.order.save(order)) // save to database
            .then(order => order.getSummary()) // return summary

    }

    async getOrders(getorder: GetOrdersRequest) {
        
        const offset = getorder.page - 1 // define offset for query
        const orders = await this.order.getOrdersSlice(getorder.size, offset) // get orders slice
        const totalRecords = await this.order.getOrdersCount() // data count
        
        // creating a paginated
        return Paginated.create({
            ...getorder,
            count: totalRecords,
            data: orders,
        })

    }

}