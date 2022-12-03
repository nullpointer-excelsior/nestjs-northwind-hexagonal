import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    
    @Prop({ type: Number, index: true })
    productId: number;
    
    @Prop()
    productName: string;
    
    // @Prop()
    // quantityPerUnit: number;
    
    @Prop()
    unitPrice: number;
    
    @Prop()
    unitsInStock: number;
    
    @Prop()
    unitsOnOrder: number;
    
    @Prop()
    discontinued: boolean;
    
}

export const ProductSchema = SchemaFactory.createForClass(Product);