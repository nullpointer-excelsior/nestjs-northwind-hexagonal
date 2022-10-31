import { Module } from '@nestjs/common';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { CoreModule } from './core/core.module';
import { CategoryRepositoryAdapter } from './infraestructure/adapters/category.repository.adapter';
import { ProductRepositoryAdapter } from './infraestructure/adapters/product.repository.adapter';
import { SupplierRepositoryAdapter } from './infraestructure/adapters/supplier.repository.adapter';
import { SharedModule } from './infraestructure/shared/shared.module';

@Module({
  imports: [
    InfraestructureModule,
    SharedModule,
    CoreModule.register({
      modules: [
        InfraestructureModule
      ],
      adapters: {
        productRepository: ProductRepositoryAdapter,
        categoryRepository: CategoryRepositoryAdapter,
        supplierRepository: SupplierRepositoryAdapter
      }
    }),
  ]
})
export class AppModule { }
