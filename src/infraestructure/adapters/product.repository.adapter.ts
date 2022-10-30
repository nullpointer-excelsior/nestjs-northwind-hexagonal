import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../core/domain/entities/Product";
import { ProductRepository } from "../../core/domain/ports/outbound/ProductRepository";
import { ProductEntity } from "../northwind-database/entities/product.entity";

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {

    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }

    async save(p: Product): Promise<Product> {
        return this.repository.save(p)
    }

}