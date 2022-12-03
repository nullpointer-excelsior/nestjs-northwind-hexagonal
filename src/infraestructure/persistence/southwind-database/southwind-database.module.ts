import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './model/customer.schema';
import { EmployeeSchema } from './model/employee.schema';
import { OrderSchema } from './model/order.schema';
import { ProductSchema } from './model/product.schema';
import { ShipperSchema } from './model/shipper.schema';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/southwind'),
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Employee', schema: EmployeeSchema },
      { name: 'Shipper', schema: ShipperSchema },
    ])
  ],
  exports:[
    MongooseModule,
  ]
})
export class SouthwindDatabaseModule {
}
