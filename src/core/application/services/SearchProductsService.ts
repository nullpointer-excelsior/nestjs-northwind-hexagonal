import { Injectable } from "@nestjs/common";
import { PostgresProductRepository } from "../../../persistence/repositories/postgres-product.repository";
import { Product } from "../../domain/entities/Product";
import { SearchProducts } from "../SearchProducts";

@Injectable()
export class SearchProductsService implements SearchProducts {

	constructor(private readonly repository: PostgresProductRepository) {}
	
	findAll(): Promise<Product[]> {
		return this.repository.findAll()
	}

 }
