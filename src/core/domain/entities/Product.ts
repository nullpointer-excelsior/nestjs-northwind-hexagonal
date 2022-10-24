import { Category } from "./Category";
import { Supplier } from "./Supplier";

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

    static create(name: string, category: Category, supplier: Supplier) {
        const product = new Product()
        product.productName = name
        product.category = category
        product.supplier = supplier
        product.discontinued = false
        product.quantityPerUnit = 0
        product.unitPrice = 0
        product.unitsInStock = 0
        product.unitsOnOrder = 0
        return product
    }

}