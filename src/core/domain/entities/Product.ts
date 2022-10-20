import { Category } from "./Category";

export class Product {

    productID: string;
    productName: string;
    category: Category;
    quantityPerLabel: number;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    discountinued: boolean;

}