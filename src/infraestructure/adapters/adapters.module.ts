import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersistenceModule } from '../persistence/persistence.module';
import { OrderSchema } from '../persistence/southwind-database/model/order.schema';
import { CustomerRepositoryFacade } from './domain/customer.repository.facade';
import { EmployeeRepositoryFacade } from './domain/employee.repository.facade';
import { MongoCustomerRepository } from './domain/mongo-customer.repository';
import { MongoEmployeeRepository } from './domain/mongo-employee.repository';
import { MongoOrderRepository } from './domain/mongo-order.repository';
import { MongoProductRepository } from './domain/mongo-product.repository';
import { MongoShipperRepository } from './domain/mongo-shipper.repository';
import { OrderRepositoryFacade } from './domain/order.repository.facade';
import { PostgresCustomerRepository } from './domain/postgres-customer.repository';
import { PostgresEmployeeRepository } from './domain/postgres-employee.repository';
import { PostgresOrderRepository } from './domain/postgres-order.repository';
import { PostgresProductRepository } from './domain/postgres-product.repository';
import { PostgresShipperRepository } from './domain/postgres-shipper.repository';
import { ProductrepositoryFacade } from './domain/product.repository.facade';
import { ShipperRepositoryFacade } from './domain/shipper.repository.facade';
import { InMemoryEventBus } from './eventbus/in-memory-event-bus.service';
import { DetailsMapper } from './mapper/DetailsMapper';
import { OrderMapper } from './mapper/OrderMapper';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY'
export const ORDER_REPOSITORY = 'ORDER_REPOSITORY'
export const NORTHWIND_ORDER_REPOSITORY = 'NORTHWIND_ORDER_REPOSITORY'
export const SOUTHWIND_ORDER_REPOSITORY = 'SOUTHWIND_ORDER_REPOSITORY'
export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY'
export const SHIPPER_REPOSITORY = 'SHIPPER_REPOSITORY'
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY'

const providers = [
    PostgresOrderRepository,
    PostgresCustomerRepository,
    PostgresEmployeeRepository,
    PostgresProductRepository,
    PostgresShipperRepository,

    MongoOrderRepository,
    MongoProductRepository,
    MongoCustomerRepository,
    MongoEmployeeRepository,
    MongoShipperRepository,

    OrderRepositoryFacade,
    ProductrepositoryFacade,
    CustomerRepositoryFacade,
    EmployeeRepositoryFacade,
    ShipperRepositoryFacade,

    OrderMapper,
    DetailsMapper,
    InMemoryEventBus,
    {
        provide: ORDER_REPOSITORY,
        useExisting: OrderRepositoryFacade,
    },
    {
        provide: NORTHWIND_ORDER_REPOSITORY,
        useExisting: PostgresOrderRepository
    },
    {
        provide: CUSTOMER_REPOSITORY,
        useExisting: CustomerRepositoryFacade
    },
    {
        provide: EMPLOYEE_REPOSITORY,
        useExisting: EmployeeRepositoryFacade
    },
    {
        provide: SHIPPER_REPOSITORY,
        useExisting: ShipperRepositoryFacade
    },
    {
        provide: PRODUCT_REPOSITORY,
        useExisting: ProductrepositoryFacade
    },
    {
        provide: SOUTHWIND_ORDER_REPOSITORY,
        useExisting: MongoOrderRepository
    }
]

@Module({
    imports: [
        PersistenceModule,
    ],
    providers: [
        ...providers
    ],
    exports: [
        ...providers
    ]
})
export class AdaptersModule { }
