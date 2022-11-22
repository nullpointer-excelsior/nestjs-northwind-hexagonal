import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../core/domain/entities/Product";
import { ProductEntity } from "../northwind-database/entities/product.entity";

@Injectable()
export class PostgresProductRepository {

    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }
    
    findAll(): Promise<Product[]> {
        return this.repository.find()
    }


}