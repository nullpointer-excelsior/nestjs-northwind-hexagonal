import { Product } from "../../Product";

export interface ProductRepository {
    
    findById(id: number): Promise<Product>
    findByOrderId(id: number): Promise<Product[]>
    update(product: Product): Promise<Product>

}