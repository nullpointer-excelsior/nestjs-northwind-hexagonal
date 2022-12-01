import { Document } from 'mongoose';

export interface OrderDocument extends Document {
  readonly orderId: number;
  readonly orderDate: Date;
  readonly customer: {
    readonly customerId: string;
    readonly contactName: string;
    readonly contactTitle: string;
    readonly companyName: string;
    readonly address: string;
    readonly city: string;
    readonly region: string;
    readonly country: string;
    readonly phone: string;
  }
  readonly employee: {
    readonly employeeId: number;
    readonly lastName: string;
    readonly firstName: string;
    readonly title: string;
    readonly titleOfCourtesy: string;
    readonly extension: string;
  }
  readonly shippedDate: Date;
  readonly requiredDate: Date;
  readonly freight: number,
  readonly shipper: {
    readonly shipperId: number;
    readonly companyName: string;
    readonly phone: string;
  }
  readonly shippingLocation: {
    readonly name: string,
    readonly address: string,
    readonly city: string,
    readonly region: string,
    readonly country: string
  }
  readonly details: {
    readonly product: {
      readonly productId: number;
      readonly productName: string;
    };
    readonly unitPrice: number;
    readonly quantity: number;
    readonly discount: number;
  }[]
}