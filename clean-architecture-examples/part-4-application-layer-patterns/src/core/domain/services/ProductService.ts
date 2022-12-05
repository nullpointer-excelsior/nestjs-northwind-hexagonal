import { ProductRepository } from "../ports/outbound/ProductRepository";

export class ProductService {

    constructor(private readonly product: ProductRepository) { }

    async updateProductStock(productId: number, unitsToDiscount: number) { 
        const product = await this.product.findById(productId)
        const unitsInStock = product.unitsInStock - unitsToDiscount
        const unitsOnOrder = product.unitsOnOrder + unitsToDiscount
        this.product.updateStock(product.productId, unitsInStock, unitsOnOrder)
    }
}