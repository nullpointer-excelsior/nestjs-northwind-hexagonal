import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
    
    @Prop({ type: String, index: true })
    customerId: string;
    
    @Prop()
    companyName: string;
    
    @Prop()
    contactName: string;
    
    @Prop()
    contactTitle: string;
    
    @Prop()
    address: string;
    
    @Prop()
    city: string;
    
    @Prop()
    region: string;
    
    @Prop()
    postalCode: string;
    
    @Prop()
    country: string;
    
    @Prop()
    phone: string;
    
    @Prop()
    fax: string;
    
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);