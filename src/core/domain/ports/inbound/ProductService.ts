import { ProductRepository } from "../outbound/ProductRepository";

export class ProductService {

    constructor(private readonly product: ProductRepository) { }

    async updateProductStock(productId: number, unitsToDiscount: number) { 
        const product = await this.product.findById(productId)
        product.unitsInStock = product.unitsInStock - unitsToDiscount
        product.unitsOnOrder = product.unitsOnOrder + unitsToDiscount
        this.product.update(product)
    }
}