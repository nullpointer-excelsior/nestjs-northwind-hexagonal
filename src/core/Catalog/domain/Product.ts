import { Category } from "./Category";
import { Supplier } from "../../Suppliers/domain/Supplier";

export class Product {

    productId: number;
    productName: string;
    category: Category;
    supplier: Supplier;
    quantityPerUnit: number;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    discontinued: boolean;

}