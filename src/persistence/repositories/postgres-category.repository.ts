import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../core/domain/entities/Category";
import { CategoryEntity } from "../northwind-database/entities/category.entity";

@Injectable()
export class PostgresCategoryRepository {

    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) { }

    async findAll(): Promise<Category[]> {
        return this.repository.find()
    }
}