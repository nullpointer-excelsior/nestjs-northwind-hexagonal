import { NewProductDTO } from "../shared/dto/NewProductDTO"

export interface ProductCreator {

    create(newProduct: NewProductDTO): Promise<number>

}