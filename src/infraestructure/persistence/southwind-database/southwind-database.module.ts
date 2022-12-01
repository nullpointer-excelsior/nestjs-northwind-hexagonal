import { Inject, Injectable, Module } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { OrderDocument } from './model/order.document';
import { OrderSchema } from './model/order.schema';

export const MONGO_CONNECTION = 'MONGO_CONNECTION'
export const ORDER_MODEL = 'ORDER_MODEL'


@Module({
  providers: [
    {
      provide: MONGO_CONNECTION,
      useFactory: (): Promise<typeof mongoose> => mongoose.connect('mongodb://localhost/southwind'),
    },
    {
      provide: ORDER_MODEL,
      useFactory: (connection: Connection) => connection.model('OrderDocument', OrderSchema),
      inject: [MONGO_CONNECTION],
    },
  ],
  exports: [
    MONGO_CONNECTION,
    ORDER_MODEL,
  ]
})
export class SouthwindDatabaseModule {

  // constructor(@Inject(ORDER_MODEL) private orderModel: mongoose.Model<OrderDocument>) {
  //     console.log('fucking conn from moduel', orderModel)
  //     const x = new orderModel({ orderId: 100 })
  //     x.save()

  //     // this.repo.save({ orderId: 100}).then(x => console.log(x))
  // }
}
