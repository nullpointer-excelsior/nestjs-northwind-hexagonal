import { Product } from "../../domain/entities/Product";
import { CategoryService } from "../../domain/ports/services/CategoryService";
import { ProductService } from "../../domain/ports/services/ProductService";
import { NewProductDTO } from "../dto/NewProductDTO";
import { InvalidCategoryError } from "../error/InvalidCategoryError";

export class ProductCreator {

    constructor(
        private product: ProductService,
        private category: CategoryService
    ) {}

    async create(newProduct: NewProductDTO) {
        const category = await this.category.findById(newProduct.categoryId)
        if (!category) {
            throw new InvalidCategoryError(newProduct.categoryId)
        }
        const p = Product.productBase(newProduct.name, category)
        await this.product.create(p)
    }

}