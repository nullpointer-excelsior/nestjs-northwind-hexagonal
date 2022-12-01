import { Inject, Module } from '@nestjs/common';
import { PersistenceModule } from '../infraestructure/persistence/persistence.module';
import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, NORTHWIND_ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
import { ProductRepository } from './domain/ports/outbound/ProductRepository';
import { OrderRepository } from './domain/ports/outbound/OrderRepository';
import { CustomerRepository } from './domain/ports/outbound/CustomerRepository';
import { EmployeeRepository } from './domain/ports/outbound/EmployeeRepository';
import { ShipperRepository } from './domain/ports/outbound/ShipperRepository';
import { OrderService } from './domain/services/OrderService';
import { CatalogUseCases } from './application/usecases/services/CatalogUseCases';
import { InMemoryEventBus } from '../infraestructure/adapters/eventbus/in-memory-event-bus.service';
import { DomainEventBus } from './shared/DomainEventBus';
import { StockUpdaterUseCase } from './application/usecases/subscribers/StockUpdaterUseCase';
import { ProductService } from './domain/services/ProductService';
import { CompanySuppliersUseCases } from './application/usecases/services/CompanySuppliersUseCases';
import { CompanyUseCases } from './application/usecases/services/CompanyUseCases';
import { CustomerPortfolioUseCases } from './application/usecases/services/CustomerPortfolioUseCases';
import { PurchaseUseCases } from './application/usecases/services/PurchaseUseCases';
import { SaveOrderForReadUseCase } from './application/usecases/subscribers/SaveOrderForReadUseCase';

export const EVENTBUS = 'EVENTBUS'

const providers = [
  CatalogUseCases,
  CompanySuppliersUseCases,
  CompanyUseCases,
  CustomerPortfolioUseCases,
  StockUpdaterUseCase,
  SaveOrderForReadUseCase
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
        product: ProductRepository, 
        eventbus: DomainEventBus
      ) => new OrderService(order, customer, employee, shipper, product, eventbus),
      inject: [
        NORTHWIND_ORDER_REPOSITORY,
        CUSTOMER_REPOSITORY,
        EMPLOYEE_REPOSITORY,
        SHIPPER_REPOSITORY,
        PRODUCT_REPOSITORY,
        EVENTBUS
      ]
    },
    {
      provide: ProductService,
      useFactory: (product: ProductRepository) => new ProductService(product),
      inject:[PRODUCT_REPOSITORY]
    },
    {
      provide: PurchaseUseCases,
      useFactory: (order: OrderService) => new PurchaseUseCases(order),
      inject: [
        OrderService,
      ]
    },
    {
      provide: EVENTBUS,
      useExisting: InMemoryEventBus
    }
  ],
  exports: [
    ...providers,
    PurchaseUseCases,
  ]
})
export class CoreModule {

  constructor(
    @Inject(EVENTBUS) private eventbus: DomainEventBus, 
    private stock: StockUpdaterUseCase,
    private orderSummary: SaveOrderForReadUseCase
  ) {
    this.eventbus.subscribe(stock)
    this.eventbus.subscribe(orderSummary)
  }

}

