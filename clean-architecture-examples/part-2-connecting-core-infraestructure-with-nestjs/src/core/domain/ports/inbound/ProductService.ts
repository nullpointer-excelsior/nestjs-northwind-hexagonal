import { Product } from "../../entities/Product";


export interface ProductService {

    save(product: Product): Promise<Product>;
    validateProductPrice(product: Product): boolean;

}