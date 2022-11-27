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
import { TransactionProvider } from './northwind-database/providers/transaction.provider';
import { PostgresCategoryRepository } from './repositories/postgres-category.repository';
import { PostgresCustomerRepository } from './repositories/postgres-customer.repository';
import { PostgresEmployeeRepository } from './repositories/postgres-employee.repository';
import { PostgresOrderDetailsRepository } from './repositories/postgres-order-details.repository';
import { PostgresOrdersRepository } from './repositories/postgres-orders.repository';
import { PostgresProductRepository } from './repositories/postgres-product.repository';
import { PostgresShipperRepository } from './repositories/postgres-shipper.repository';
import { PostgresSupplierRepository } from './repositories/postgres-supplier.repository';

const providers = [
  PostgresProductRepository,
  PostgresCategoryRepository,
  PostgresSupplierRepository,
  PostgresCustomerRepository,
  PostgresEmployeeRepository,
  PostgresShipperRepository,
  PostgresOrdersRepository,
  PostgresOrderDetailsRepository,
]

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
    ])
  ],
  exports: [
    ...providers,
    NorthwindDatabaseModule,
    TypeOrmModule.forFeature([
      ShippersEntity,
  ])
  ],
  providers: providers,
})
export class PersistenceModule { }
