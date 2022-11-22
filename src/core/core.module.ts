import { Module } from '@nestjs/common';
import { PersistenceModule } from '../infraestructure/persistence/persistence.module';
import { SearchEmployeeService } from './application/services/SearchEmployeeService';
import { SearchOrderService } from './application/services/SearchOrderService';
import { SearchCategoriesService } from './application/services/SearchCategoriesService';
import { SearchCustomersService } from './application/services/SearchCustomersService';
import { SearchProductsService } from './application/services/SearchProductsService';
import { SearchShipperService } from './application/services/SearchShipperService';
import { CreateOrderService } from './application/services/CreateOrderService';


const providers = [
  SearchProductsService,
  SearchCategoriesService,
  SearchCustomersService,
  SearchEmployeeService,
  SearchShipperService,
  SearchOrderService,
  CreateOrderService
]

@Module({
  imports: [
    PersistenceModule
  ],
  providers: [
    ...providers
  ],
  exports: [
    ...providers
  ]
})
export class CoreModule {

}

