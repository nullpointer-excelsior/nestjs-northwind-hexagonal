import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';

import { PostgresCustomerRepository } from './domain/postgres-customer.repository';
import { PostgresEmployeeRepository } from './domain/postgres-employee.repository';
import { PostgresOrderRepository } from './domain/postgres-order.repository';
import { PostgresProductRepository } from './domain/postgres-product.repository';
import { PostgresShipperRepository } from './domain/postgres-shipper.repository';
import { InMemoryEventBus } from './eventbus/in-memory-event-bus.service';
import { DetailsMapper } from './mapper/DetailsMapper';
import { OrderMapper } from './mapper/OrderMapper';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY'
export const ORDER_REPOSITORY = 'ORDER_REPOSITORY'
export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY'
export const SHIPPER_REPOSITORY = 'SHIPPER_REPOSITORY'
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY'

const providers = [
    PostgresOrderRepository,
    PostgresCustomerRepository,
    PostgresEmployeeRepository,
    PostgresProductRepository,
    PostgresShipperRepository,

    OrderMapper,
    DetailsMapper,
    InMemoryEventBus,
    {
        provide: ORDER_REPOSITORY,
        useExisting: PostgresOrderRepository,
    },
    {
        provide: ORDER_REPOSITORY,
        useExisting: PostgresOrderRepository
    },
    {
        provide: CUSTOMER_REPOSITORY,
        useExisting: PostgresCustomerRepository
    },
    {
        provide: EMPLOYEE_REPOSITORY,
        useExisting: PostgresEmployeeRepository
    },
    {
        provide: SHIPPER_REPOSITORY,
        useExisting: PostgresShipperRepository
    },
    {
        provide: PRODUCT_REPOSITORY,
        useExisting: PostgresProductRepository
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
