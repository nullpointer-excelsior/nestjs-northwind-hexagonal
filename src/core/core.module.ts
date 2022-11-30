import { Inject, Module } from '@nestjs/common';
import { PersistenceModule } from '../infraestructure/persistence/persistence.module';
import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
import { ProductRepository } from './domain/ports/outbound/ProductRepository';
import { OrderRepository } from './domain/ports/outbound/OrderRepository';
import { CustomerRepository } from './domain/ports/outbound/CustomerRepository';
import { EmployeeRepository } from './domain/ports/outbound/EmployeeRepository';
import { ShipperRepository } from './domain/ports/outbound/ShipperRepository';
import { OrderService } from './domain/ports/inbound/OrderService';
import { CatalogUseCases } from './application/services/CatalogUseCases';
import { InMemoryEventBus } from '../infraestructure/adapters/eventbus/in-memory-event-bus.service';
import { DomainEventBus } from './shared/DomainEventBus';
import { StockUpdaterUseCase } from './application/subscribers/StockUpdaterUseCase';
import { ProductService } from './domain/ports/inbound/ProductService';
import { CompanySuppliersUseCases } from './application/services/CompanySuppliersUseCases';
import { CompanyUseCases } from './application/services/CompanyUseCases';
import { CustomerPortfolioUseCases } from './application/services/CustomerPortfolioUseCases';
import { PurchaseUseCases } from './application/services/PurchaseUseCases';


const providers = [
  CatalogUseCases,
  CompanySuppliersUseCases,
  CompanyUseCases,
  CustomerPortfolioUseCases,
  StockUpdaterUseCase
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
      provide: ProductService,
      useFactory: (product: ProductRepository) => new ProductService(product),
      inject:[PRODUCT_REPOSITORY]
    },
    {
      provide: PurchaseUseCases,
      useFactory: (order: OrderService, eventbus: DomainEventBus) => new PurchaseUseCases(order, eventbus),
      inject: [
        OrderService,
        'EVENTBUS'
      ]
    },
    {
      provide: 'EVENTBUS',
      useExisting: InMemoryEventBus
    }
  ],
  exports: [
    ...providers,
    PurchaseUseCases,
  ]
})
export class CoreModule {

  constructor(@Inject('EVENTBUS') private eventbus: DomainEventBus, private stock: StockUpdaterUseCase) {
    this.eventbus.subscribe(stock)
  }

}

