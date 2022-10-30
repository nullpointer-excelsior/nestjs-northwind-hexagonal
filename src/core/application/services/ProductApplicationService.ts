import { Product } from "../../domain/entities/Product"
import { CategoryService } from "../../domain/ports/inbound/CategoryService"
import { ProductService } from "../../domain/ports/inbound/ProductService"
import { SupplierService } from "../../domain/ports/inbound/SupplierService"
import { NewProductDTO } from "../../shared/dto/NewProductDTO"
import { ProductApplicationError } from "../../shared/error/ProductApplicationError"
import { ProductApplication } from "../ProductApplication"

export class ProductApplicationService implements ProductApplication {

    constructor(
        private product: ProductService,
        private category: CategoryService,
        private supplier: SupplierService,
    ) { }

    async createProduct(newProduct: NewProductDTO) {
        const category = await this.category.findById(newProduct.categoryId)
        if (!category) {
            throw new ProductApplicationError(`Categoría no encontrada id=${newProduct.categoryId}`)
        }
        const supplier = await this.supplier.findById(newProduct.supplierId)
        if (!supplier) {
            throw new ProductApplicationError(`Proveedor no encontrado id=${newProduct.supplierId}`)
        }
        const entity = Product.create(newProduct.name, newProduct.price, category, supplier)
        const saved = await this.product.save(entity)
        return saved.productId
    }

}