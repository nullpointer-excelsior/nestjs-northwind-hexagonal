import { Injectable } from "@nestjs/common";
import { PostgresCategoryRepository } from "../../../infraestructure/persistence/repositories/postgres-category.repository";
import { Category } from "../../domain/entities/Category";

@Injectable()
export class SearchCategoriesService {

	constructor(private readonly repository: PostgresCategoryRepository) {}
	
	findAll(): Promise<Category[]> {
		return this.repository.findAll()
	}

 }
