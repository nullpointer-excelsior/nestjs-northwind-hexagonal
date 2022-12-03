import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductRepository } from "../../../core/domain/ports/outbound/ProductRepository";
import { Product } from "../../../core/domain/Product";
import { ProductDocument } from "../../persistence/southwind-database/model/product.schema";

@Injectable()
export class MongoProductRepository implements ProductRepository {

    constructor(@InjectModel('Product') private model: Model<ProductDocument>) { }
   

    async findById(id: number): Promise<Product> {
        return this.model
            .findOne({ productId: id })
            .exec()
            .then(doc => this.map(doc));
    }

    async update(product: Product): Promise<Product> {
        return this.model
            .findOne({ productId: product.productId })
            .updateOne(product)
            .exec()
            .then(doc => product)
    }

    async count() {
        return this.model.count()
    }

    async save(p: Product){
        const product = new this.model({
            ...p
        })
        await product.save()
    }

    updateStock(productId: number, unitsInStock: number, unitsOnOrder: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    map(doc: ProductDocument) {
        const p = new Product()
        p.productId = doc.productId
        p.productName = doc.productName
        p.discontinued = doc.discontinued
        // p.quantityPerUnit = 10
        p.unitPrice = doc.unitPrice
        p.unitsInStock = doc.unitsInStock
        p.unitsOnOrder = doc.unitsOnOrder
        return p
    }
}