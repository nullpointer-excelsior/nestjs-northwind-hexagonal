import { Injectable } from "@nestjs/common";
import { Order } from "../../domain/Order";
import { ProductService } from "../../domain/services/ProductService";

@Injectable()
export class StockUseCases {

    constructor(private product: ProductService) {}

    async updateStockProducts(order: Order) {
        
        for (let detail of order.details) {
            await this.product.updateProductStock(detail.product.productId, detail.quantity)
        }
        
    }

}