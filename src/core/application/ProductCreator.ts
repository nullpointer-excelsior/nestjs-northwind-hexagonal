import { Category } from "../domain/entities/Category"
import { Product } from "../domain/entities/Product"
import { CategoryService } from "../domain/ports/services/CategoryService"
import { ProductService } from "../domain/ports/services/ProductService"
import { NewProductDTO } from "../shared/dto/NewProductDTO"
import { InvalidCategoryError } from "../shared/error/InvalidCategoryError"

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
        const entity = this.createProductEntity(newProduct.name, category)
        await this.product.create(entity)
    }

    private createProductEntity(name: string, category: Category) {
        const product = new Product()
        product.productName = name
        product.category = category
        product.discountinued = false
        product.quantityPerLabel = 0
        product.unitPrice = 0
        product.unitsInStock = 0
        product.unitsOnOrder = 0
        return product
    }

}