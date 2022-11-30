import { Module, Scope } from '@nestjs/common';
import { PersistenceModule } from '../infraestructure/persistence/persistence.module';
import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
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
  CustomerPortfolioUseCases,
]

@Module({
  imports: [
    PersistenceModule,
    AdaptersModule,
  ],
  providers: [
    ...providers,
    {
      provide: OrderService,
      useFactory: (
        order: OrderRepository,
        customer: CustomerRepository,
        employee: EmployeeRepository,
        shipper: ShipperRepository,
        product: ProductRepository
      ) => new OrderService(order, customer, employee, shipper, product),
      inject: [
        ORDER_REPOSITORY,
        CUSTOMER_REPOSITORY,
        EMPLOYEE_REPOSITORY,
        SHIPPER_REPOSITORY,
        PRODUCT_REPOSITORY
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

