
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  
  @Prop({ type: Number, index: true})
  orderId: number;
  
  @Prop()
  orderDate: Date;
  
  @Prop(raw({
    customerId: { type: String },
    contactName: { type: String },
    contactTitle: { type: String },
    companyName: { type: String },
    address: { type: String },
    city: { type: String },
    region: { type: String },
    country: { type: String },
    phone: { type: String },
  }))
  customer: Record<string, any>;
  
  @Prop(raw({
    employeeId: { type: Number },
    lastName: { type: String },
    firstName: { type: String },
    title: { type: String },
    titleOfCourtesy: { type: String },
    extension: { type: String }
  }))
  employee: Record<string, any>;
  
  @Prop()
  shippedDate: Date;
  
  @Prop()
  requiredDate: Date;
  
  @Prop()
  freight: number;

  @Prop(raw({
    shipperId: { type: Number },
    companyName: { type: String },
    phone: { type: String },
  }))
  shipper: Record<string, any>;

  @Prop(raw({
    name: { type: String },
    address: { type: String },
    city: { type: String },
    region: { type: String },
    country: { type: String }
  }))
  shippingLocation: Record<string, any>;

  @Prop([raw({
    product: {
      productId: { type: Number },
      productName:  { type: String },
    },
    unitPrice: { type: Number },
    quantity: { type: Number },
    discount: { type: Number },
  })])
  details: Record<string, any>[]

}

export const OrderSchema = SchemaFactory.createForClass(Order);

