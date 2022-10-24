import { Product } from "../entities/Product";
import { ProductService } from "../ports/inbound/ProductService";
import { ProductRepository } from "../ports/outbound/ProductRepository";
import { ProductServiceError } from "../../shared/error/ProductServiceError";

export class ProductDomainService implements ProductService {

    constructor(private repository: ProductRepository) {}

    async save(product: Product): Promise<Product> {
        if (this.validateProductPrice(product)) {
            return this.repository.save(product)
        }
        throw new ProductServiceError('Product price cannot be negative or equal to zero')
    }

    validateProductPrice(product: Product): boolean {
        return product.unitPrice > 0
    }

}