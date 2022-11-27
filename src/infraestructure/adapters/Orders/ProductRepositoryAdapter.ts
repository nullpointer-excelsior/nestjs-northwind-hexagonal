import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductRepository } from "../../../core/Orders/domain/ports/outbound/ProductRepository";
import { Product } from "../../../core/Orders/domain/Product";
import { ProductEntity } from "../../persistence/northwind-database/entities/product.entity";

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {
    
    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }

    async findById(id: number): Promise<Product> {
        return this.repository.findOneBy({ productId: id})
    }

}