import { Product } from "../../Product";

export interface ProductRepository {
    findById(id: number): Promise<Product>
}