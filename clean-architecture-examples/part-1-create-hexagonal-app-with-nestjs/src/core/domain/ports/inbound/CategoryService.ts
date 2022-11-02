import { Category } from "../../entities/Category";

export interface CategoryService {

    findById(id: number): Promise<Category>;
    findAll(): Promise<Category[]>;

}