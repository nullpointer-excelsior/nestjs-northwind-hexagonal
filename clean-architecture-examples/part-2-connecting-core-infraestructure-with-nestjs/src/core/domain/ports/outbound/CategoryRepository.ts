import { Category } from "../../entities/Category";

export interface CategoryRepository {

    findById(id: number): Promise<Category>;
    findAll(): Promise<Category[]>
    
}