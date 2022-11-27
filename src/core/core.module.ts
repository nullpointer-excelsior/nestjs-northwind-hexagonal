import { Module } from '@nestjs/common';
import { PersistenceModule } from '../infraestructure/persistence/persistence.module';
import { SearchEmployeeService } from './Company/application/SearchEmployeeService';
import { SearchCategoriesService } from './Catalog/application/SearchCategoriesService';
import { SearchCustomersService } from './CustomerPortfolio/application/SearchCustomersService';
import { SearchProductsService } from './Catalog/application/SearchProductsService';
import { SearchShipperService } from './Suppliers/application/SearchShipperService';
import { CreateOrderUseCase } from './Orders/application/CreateOrderUseCase';
import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
import { DetailService } from './Orders/domain/ports/inbound/DetailService';
import { ProductRepository } from './Orders/domain/ports/outbound/ProductRepository';
import { OrderRepository } from './Orders/domain/ports/outbound/OrderRepository';
import { CustomerRepository } from './Orders/domain/ports/outbound/CustomerRepository';
import { EmployeeRepository } from './Orders/domain/ports/outbound/EmployeeRepository';
import { ShipperRepository } from './Orders/domain/ports/outbound/ShipperRepository';
import { OrderService } from './Orders/domain/ports/inbound/OrderService';

export const CREATE_ORDER_USER_USE_CASE = 'CREATE_ORDER_USER_USE_CASE'
const DETAIL_SERVICE = 'DETAIL_SERVICE'
const ORDER_SERVICE = 'ORDER_SERVICE'

const providers = [
  SearchProductsService,
  SearchCategoriesService,
  SearchCustomersService,
  SearchEmployeeService,
  SearchShipperService,
]

@Module({
  imports: [
    PersistenceModule,
    AdaptersModule,
  ],
  providers: [
    ...providers,
    {
      provide: DETAIL_SERVICE,
      useFactory: (product: ProductRepository) => new DetailService(product),
      inject: [
        PRODUCT_REPOSITORY
      ]
    },
    {
      provide: ORDER_SERVICE,
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
        DETAIL_SERVICE
      ]
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (order: OrderService) => new CreateOrderUseCase(order),
      inject: [ORDER_SERVICE]
    }
  ],
  exports: [
    ...providers,
    CreateOrderUseCase,
  ]
})
export class CoreModule {

}

