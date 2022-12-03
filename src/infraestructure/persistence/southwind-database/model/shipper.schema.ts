import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShipperDocument = HydratedDocument<Shipper>;

@Schema()
export class Shipper {
    
    @Prop({ type: Number, index: true })
    shipperId: number;
    @Prop()
    companyName: string;
    @Prop()
    phone: string;
   
    
}

export const ShipperSchema = SchemaFactory.createForClass(Shipper);