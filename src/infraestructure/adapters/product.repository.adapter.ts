import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { Product } from "../../core/domain/entities/Product";
import { ProductRepository } from "../../core/domain/ports/outbound/ProductRepository";
import { ProductEntity } from "../northwind-database/entities/product.entity";

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {

    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }

    async save(p: Product): Promise<Product> {
        
        const result = await this.repository
            .createQueryBuilder()
            .insert()
            .into(ProductEntity)
            .values({
                productName: p.productName,
                categoryId: p.category.categoryId,
                discontinued: p.discontinued,
                quantityPerUnit: p.quantityPerUnit,
                supplierId: p.supplier.supplierId,
                unitPrice: p.unitPrice,
                unitsInStock: p.unitsInStock,
                unitsOnOrder: p.unitsOnOrder,
            })
            .execute()

        return {
            productId: this.getProductId(result),
            ...p
        }
    }

    getProductId(result: InsertResult) {
        return result.identifiers[0].productId
    }

}