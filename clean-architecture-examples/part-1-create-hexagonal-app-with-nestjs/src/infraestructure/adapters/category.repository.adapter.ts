import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../core/domain/entities/Category";
import { CategoryRepository } from "../../core/domain/ports/outbound/CategoryRepository";
import { CategoryEntity } from "../northwind-database/entities/category.entity";

@Injectable()
export class CategoryRepositoryAdapter implements CategoryRepository {

    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) { }
    
    async findById(id: number): Promise<Category> {
        return this.repository.findOneBy({ categoryId: id })
    }

    async findAll(): Promise<Category[]> {
        return this.repository.find()
    }
}