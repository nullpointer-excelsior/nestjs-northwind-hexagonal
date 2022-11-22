import { Product } from "../domain/entities/Product";

export interface SearchProducts {

    findAll(): Promise<Product[]>;

}