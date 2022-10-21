import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../core/domain/entities/Product";
import { ProductService } from "../../core/domain/ports/services/ProductService";
import { ProductEntity } from "../northwind-database/entities/product.entity";

@Injectable()
export class ProductServiceAdapter implements ProductService {

    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }

    async create(p: Product) {
        return this.repository.save(p)
    }

}