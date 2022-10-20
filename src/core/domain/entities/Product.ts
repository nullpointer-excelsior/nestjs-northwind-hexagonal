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

    static productBase(name: string, category: Category) {
        const product = new Product()
        product.productName = name
        product.category = category
        product.discountinued = false
        product.quantityPerLabel = 0
        product.unitPrice = 0
        product.unitsInStock = 0
        product.unitsOnOrder = 0
        return product
    }

}