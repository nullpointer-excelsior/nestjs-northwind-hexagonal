import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CustomerRepositoryAdapter } from './Orders/CustomerRepositoryAdapter';
import { EmployeeRepositoryAdapter } from './Orders/EmployeeRepositoryAdapter';
import { OrderRepositoryAdapter } from './Orders/OrderRepositoryAdapter';
import { ProductRepositoryAdapter } from './Orders/ProductRepositoryAdapter';
import { ShipperRepositoryAdapter } from './Orders/ShipperRepositoryAdapter';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY'
export const ORDER_REPOSITORY = 'ORDER_REPOSITORY'
export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY'
export const SHIPPER_REPOSITORY = 'SHIPPER_REPOSITORY'
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY'

const providers = [
    OrderRepositoryAdapter,
    CustomerRepositoryAdapter,
    EmployeeRepositoryAdapter,
    ShipperRepositoryAdapter,
    ProductRepositoryAdapter,
    {
        provide: ORDER_REPOSITORY,
        useExisting: OrderRepositoryAdapter
    },
    {
        provide: CUSTOMER_REPOSITORY,
        useExisting: CustomerRepositoryAdapter
    },
    {
        provide: EMPLOYEE_REPOSITORY,
        useExisting: EmployeeRepositoryAdapter
    },
    {
        provide: SHIPPER_REPOSITORY,
        useExisting: ShipperRepositoryAdapter
    },
    {
        provide: PRODUCT_REPOSITORY,
        useExisting: ProductRepositoryAdapter
    }
]

@Module({
    imports: [
        PersistenceModule,
    ],
    providers: providers,
    exports: [
        ...providers
    ]
})
export class AdaptersModule { }
