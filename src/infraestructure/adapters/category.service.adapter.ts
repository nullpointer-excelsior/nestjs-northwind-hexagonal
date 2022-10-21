import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../core/domain/entities/Category";
import { CategoryService } from "../../core/domain/ports/services/CategoryService";
import { CategoryEntity } from "../northwind-database/entities/category.entity";

@Injectable()
export class CategoryServiceAdapter implements CategoryService {

    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) { }

    async findById(id: number): Promise<Category> {
        return this.repository.findOneBy({ categoryId: id })
    }

}