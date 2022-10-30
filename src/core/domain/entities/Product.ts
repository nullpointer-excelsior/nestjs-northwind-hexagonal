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

    static create(name: string, price: number, category: Category, supplier: Supplier): Product {
        const product = new Product()
        product.productName = name
        product.unitPrice = price
        product.category = category
        product.supplier = supplier
        product.discontinued = false
        product.quantityPerUnit = 0
        product.unitsInStock = 0
        product.unitsOnOrder = 0
        return product
    }

}