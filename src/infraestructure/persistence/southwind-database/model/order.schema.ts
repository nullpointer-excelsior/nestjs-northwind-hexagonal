
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  orderId: Number,
  orderDate: Date,
  customer: {
    customerId: String,
    contactName: String,
    contactTitle: String,
    companyName: String,
    address: String,
    city: String,
    region: String,
    country: String,
    phone: String,
  },
  employee: {
    employeeId: Number,
    lastName: String,
    firstName: String,
    title: String,
    titleOfCourtesy: String,
    extension: String,
  },
  shippedDate: Date,
  requiredDate: Date,
  freight: Number,
  shipper: {
    shipperId: Number,
    companyName: String,
    phone: String,
  },
  shippingLocation: {
    name: String,
    address: String,
    city: String,
    region: String,
    country: String
  },
  details: [{
    product: {
      productId: Number,
      productName: String,
    },
    unitPrice: Number,
    quantity: Number,
    discount: Number,
  }]
})