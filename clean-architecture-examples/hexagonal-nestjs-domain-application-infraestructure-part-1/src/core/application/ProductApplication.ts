import { NewProductDTO } from "../shared/dto/NewProductDTO"

export interface ProductApplication {

    createProduct(newProduct: NewProductDTO): Promise<number>

}