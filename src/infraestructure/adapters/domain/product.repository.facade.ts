import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../../../core/domain/ports/outbound/ProductRepository";
import { Product } from "../../../core/domain/Product";
import { MongoProductRepository } from "./mongo-product.repository";
import { PostgresProductRepository } from "./postgres-product.repository";

@Injectable()
export class ProductrepositoryFacade implements ProductRepository {
    
    constructor(
        private mongo: MongoProductRepository,
        private postgres: PostgresProductRepository
    ) {}
    
    async findById(id: number): Promise<Product> {
        return await this.mongo.findById(id)
    }

    update(product: Product): Promise<Product> {
        return this.postgres.update(product)
    }

    async updateStock(productId: number, unitsInStock: number, unitsOnOrder: number): Promise<void> {
        await this.postgres.updateStock(productId, unitsInStock, unitsOnOrder)
    }

}