import { Detail } from "../../Detail";
import { ProductRepository } from "../outbound/ProductRepository";
import { DetailDTO } from "./OrderService";

export class DetailService {

    constructor(private readonly product: ProductRepository) { }

    async enrichProductDetails(detailsdto: DetailDTO[]) {
        const details: Detail[] = []
        for (let detail of detailsdto) {
            const entity = new Detail()
            entity.discount = detail.discount
            entity.product = await this.product.findById(detail.productId)
            entity.unitPrice = detail.unitPrice
            entity.quantity = detail.quantity
            details.push(entity)
        }
        return details
    }

}