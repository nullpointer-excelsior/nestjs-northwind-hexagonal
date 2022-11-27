import { Injectable } from "@nestjs/common";
import { PostgresProductRepository } from "../../../infraestructure/persistence/repositories/postgres-product.repository";
import { Product } from "../domain/Product";

@Injectable()
export class SearchProductsService {

	constructor(private readonly repository: PostgresProductRepository) {}
	
	findAll(): Promise<Product[]> {
		return this.repository.findAll()
	}

 }
