import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './northwind-database/entities/category.entity';
import { CustomersEntity } from './northwind-database/entities/customer.entity';
import { EmployeesEntity } from './northwind-database/entities/employess.entity';
import { OrderDetailsEntity } from './northwind-database/entities/order-details.entity';
import { OrdersEntity } from './northwind-database/entities/orders.entity';
import { ProductEntity } from './northwind-database/entities/product.entity';
import { ShippersEntity } from './northwind-database/entities/shippers.entity';
import { SupplierEntity } from './northwind-database/entities/supplier.entity';
import { NorthwindDatabaseModule } from './northwind-database/northwind-database.module';


@Module({
  imports: [
    NorthwindDatabaseModule,
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity,
      SupplierEntity,
      CustomersEntity,
      EmployeesEntity,
      ShippersEntity,
      OrdersEntity,
      OrderDetailsEntity
    ]),
  ],
  exports: [
    NorthwindDatabaseModule,
    TypeOrmModule.forFeature([
      ShippersEntity,
    ]),
  ]
})
export class PersistenceModule { }
