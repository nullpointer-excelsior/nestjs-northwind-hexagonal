import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductRepository } from "../../../core/domain/ports/outbound/ProductRepository";
import { Product } from "../../../core/domain/Product";
import { OrderDetailsEntity } from "../../persistence/northwind-database/entities/order-details.entity";
import { ProductEntity } from "../../persistence/northwind-database/entities/product.entity";

@Injectable()
export class PostgresProductRepository implements ProductRepository {

    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }
   

    async findById(id: number): Promise<Product> {
        
        return this.repository.findOneBy({ productId: id })

    }

    findByOrderId(orderId: number): Promise<Product[]> {

        return this.repository
            .createQueryBuilder('product')
            .leftJoinAndSelect(OrderDetailsEntity, 'detail', 'detail.productId = product.productId')
            .where('detail.orderId = :orderId', { orderId: orderId })
            .getMany()

    }

    update(product: Product): Promise<Product> {
        return this.repository.save(product)
    }

}