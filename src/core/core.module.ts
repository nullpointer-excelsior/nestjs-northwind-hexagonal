import { Inject, Module } from '@nestjs/common';
import { PersistenceModule } from '../infraestructure/persistence/persistence.module';
import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
import { ProductRepository } from './domain/ports/outbound/ProductRepository';
import { OrderRepository } from './domain/ports/outbound/OrderRepository';
import { CustomerRepository } from './domain/ports/outbound/CustomerRepository';
import { EmployeeRepository } from './domain/ports/outbound/EmployeeRepository';
import { ShipperRepository } from './domain/ports/outbound/ShipperRepository';
import { OrderService } from './domain/services/OrderService';
import { CatalogUseCases } from './application/services/CatalogUseCases';
import { InMemoryEventBus } from '../infraestructure/adapters/eventbus/in-memory-event-bus.service';
import { DomainEventBus } from './shared/DomainEventBus';
import { ProductService } from './domain/services/ProductService';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderHandler } from './application/entrypoint/commands/handlers/CreateOrderHandler';
import { OrdersQueryHandler } from './application/entrypoint/queries/handlers/OrdersQueryHandler';
import { EventBusPublisher } from './domain/ports/inbound/EventBusPublisher';
import { EventBusPublisherService } from '../infraestructure/adapters/eventbus/event-bus-publisher.service';
import { OrderCreatedHandler } from './application/entrypoint/events/handlers/OrderCreatedHandler';
import { CompanySuppliersUseCases } from './application/services/CompanySuppliersUseCases';
import { CompanyUseCases } from './application/services/CompanyUseCases';
import { CustomerPortfolioUseCases } from './application/services/CustomerPortfolioUseCases';
import { StockUseCases } from './application/services/StockUseCases';
import { PurchaseUseCases } from './application/services/PurchaseUseCases';

export const EVENTBUS = 'EVENTBUS'

const providers = [
  CatalogUseCases,
  CompanySuppliersUseCases,
  CompanyUseCases,
  CustomerPortfolioUseCases,
  StockUseCases,
  CreateOrderHandler,
  OrdersQueryHandler,
  OrderCreatedHandler,
  EventBusPublisherService
]

@Module({
  imports: [
    PersistenceModule,
    AdaptersModule,
    CqrsModule
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
        eventbus: EventBusPublisher
      ) => new OrderService(order, customer, employee, shipper, product, eventbus),
      inject: [
        ORDER_REPOSITORY,
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
      inject: [PRODUCT_REPOSITORY]
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
      useExisting: EventBusPublisherService
    }
  ],
  exports: [
    PurchaseUseCases,
    CqrsModule,
    AdaptersModule,
    ...providers,
  ]
})
export class CoreModule {

  // constructor(
  //   @Inject(EVENTBUS) private eventbus: DomainEventBus,
  //   stock: StockUpdaterUseCase,
  //   orderSummary: SaveOrderForReadUseCase
  // ) {
  //   this.eventbus.subscribe(stock)
  //   this.eventbus.subscribe(orderSummary)
  // }

}

