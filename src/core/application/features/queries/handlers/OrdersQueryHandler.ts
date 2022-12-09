import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Order } from "../../../../domain/Order";
import { Paginated } from "../../../utils/Paginated";
import { PurchaseUseCases } from "../../../services/PurchaseUseCases";
import { OrdersQuery } from "../OrdersQuery";

@QueryHandler(OrdersQuery)
export class OrdersQueryHandler implements IQueryHandler<OrdersQuery>{

    constructor(private purchase: PurchaseUseCases) { }

    execute(query: OrdersQuery): Promise<Paginated<Order>> {
        return this.purchase.getOrders(query)
    }

}