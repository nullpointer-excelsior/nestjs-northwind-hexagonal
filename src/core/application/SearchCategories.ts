import { Category } from "../domain/entities/Category";

export interface SearchCategories {

    findAll(): Promise<Category[]>;

}