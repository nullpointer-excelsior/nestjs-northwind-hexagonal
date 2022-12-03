import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductRepository } from "../../../core/domain/ports/outbound/ProductRepository";
import { Product } from "../../../core/domain/Product";
import { ProductEntity } from "../../persistence/northwind-database/entities/product.entity";

@Injectable()
export class PostgresProductRepository implements ProductRepository {

    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }

    async findById(id: number): Promise<Product> {
        return this.repository.findOneBy({ productId: id })
    }

    async findAll(): Promise<Product[]> {
        return this.repository.find()
    }

    async update(product: Product): Promise<Product> {
        return this.repository.save(product)
    }

    async updateStock(productId: number, unitsInStock: number, unitsOnOrder: number): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update(ProductEntity)
            .set({
                unitsInStock: unitsInStock,
                unitsOnOrder: unitsOnOrder
            })
            .where('productId =:productId', { productId: productId})
            .execute()
    }



}