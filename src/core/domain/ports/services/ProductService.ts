import { Product } from "../../entities/Product";

export interface ProductService {

    create(product: Product): Promise<void>;

}