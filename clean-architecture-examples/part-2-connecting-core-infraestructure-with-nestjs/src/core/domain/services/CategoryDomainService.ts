import { Category } from "../entities/Category";
import { CategoryService } from "../ports/inbound/CategoryService";
import { CategoryRepository } from "../ports/outbound/CategoryRepository";

export class CategoryDomainService implements CategoryService {

    constructor(private repository: CategoryRepository) {}

    findById(id: number): Promise<Category> {
        return this.repository.findById(id)
    }

    findAll(): Promise<Category[]> {
        return this.repository.findAll()
    }

}