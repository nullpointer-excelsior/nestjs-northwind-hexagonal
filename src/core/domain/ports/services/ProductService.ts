import { Product } from "../../entities/Product";

export interface ProductService {

    save(product: Product): Promise<Product>;

}