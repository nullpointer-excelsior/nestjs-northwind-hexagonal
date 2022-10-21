import { Category } from "../domain/entities/Category"
import { Product } from "../domain/entities/Product"
import { Supplier } from "../domain/entities/Supplier"
import { CategoryService } from "../domain/ports/services/CategoryService"
import { ProductService } from "../domain/ports/services/ProductService"
import { SupplierService } from "../domain/ports/services/SupplierService"
import { NewProductDTO } from "../shared/dto/NewProductDTO"
import { ProductCreatorError } from "../shared/error/ProductCreatorError"
import { ProductCreator } from "./ProductCreator"

export class ProductCreatorApplication implements ProductCreator {

    constructor(
        private product: ProductService,
        private category: CategoryService,
        private supplier: SupplierService
    ) { }

    async create(newProduct: NewProductDTO) {
        const category = await this.category.findById(newProduct.categoryId)
        if (!category) {
            throw new ProductCreatorError(`Categoría no encontrada id=${newProduct.categoryId}`)
        }
        const supplier = await this.supplier.findById(newProduct.supplierId)
        if (!supplier) {
            throw new ProductCreatorError(`Proveedor no encontrado id=${newProduct.supplierId}`)
        }
        const entity = this.createProductEntity(newProduct.name, category, supplier)
        const saved = await this.product.create(entity)
        return saved.productId
    }

    private createProductEntity(name: string, category: Category, supplier: Supplier) {
        const product = new Product()
        product.productName = name
        product.category = category
        product.supplier = supplier
        product.discontinued = false
        product.quantityPerUnit = 0
        product.unitPrice = 0
        product.unitsInStock = 0
        product.unitsOnOrder = 0
        return product
    }

}