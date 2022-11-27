import { Module } from '@nestjs/common';
import { PersistenceModule } from '../infraestructure/persistence/persistence.module';
import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
import { DetailService } from './domain/ports/inbound/DetailService';
import { ProductRepository } from './domain/ports/outbound/ProductRepository';
import { OrderRepository } from './domain/ports/outbound/OrderRepository';
import { CustomerRepository } from './domain/ports/outbound/CustomerRepository';
import { EmployeeRepository } from './domain/ports/outbound/EmployeeRepository';
import { ShipperRepository } from './domain/ports/outbound/ShipperRepository';
import { OrderService } from './domain/ports/inbound/OrderService';
import { PurchaseUseCases } from './application/PurchaseUseCases';
import { CatalogUseCases } from './application/CatalogUseCases';
import { CompanySuppliersUseCases } from './application/CompanySuppliersUseCases';
import { CompanyUseCases } from './application/CompanyUseCases';
import { CustomerPortfolioUseCases } from './application/CustomerPortfolioUseCases';


const providers = [
  CatalogUseCases,
  CompanySuppliersUseCases,
  CompanyUseCases,
  CustomerPortfolioUseCases
]

@Module({
  imports: [
    PersistenceModule,
    AdaptersModule,
  ],
  providers: [
    ...providers,
    {
      provide: DetailService,
      useFactory: (product: ProductRepository) => new DetailService(product),
      inject: [
        PRODUCT_REPOSITORY
      ]
    },
    {
      provide: OrderService,
      useFactory: (
        order: OrderRepository,
        customer: CustomerRepository,
        employee: EmployeeRepository,
        shipper: ShipperRepository,
        detail: DetailService
      ) => new OrderService(order, customer, employee, shipper, detail),
      inject: [
        ORDER_REPOSITORY,
        CUSTOMER_REPOSITORY,
        EMPLOYEE_REPOSITORY,
        SHIPPER_REPOSITORY,
        DetailService
      ]
    },
    {
      provide: PurchaseUseCases,
      useFactory: (order: OrderService) => new PurchaseUseCases(order),
      inject: [OrderService]
    }
  ],
  exports: [
    ...providers,
    PurchaseUseCases,
  ]
})
export class CoreModule {

}

