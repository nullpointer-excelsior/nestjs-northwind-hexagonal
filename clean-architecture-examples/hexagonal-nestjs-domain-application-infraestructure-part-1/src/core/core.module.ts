import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductApplicationService } from './application/services/ProductApplicationService';
import { CategoryRepository } from './domain/ports/outbound/CategoryRepository';
import { ProductRepository } from './domain/ports/outbound/ProductRepository';
import { SupplierRepository } from './domain/ports/outbound/SupplierRepository';
import { CategoryDomainService } from './domain/services/CategoryDomainService';
import { ProductDomainService } from './domain/services/ProductDomainService';
import { SupplierDomainService } from './domain/services/SupplierDomainService';

/**
 * Options for core module 
 */
export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    productRepository: Type<ProductRepository>;
    categoryRepository: Type<CategoryRepository>;
    supplierRepository: Type<SupplierRepository>;
  }
}

/**
 * Providers token for netsjs injection
 */
export const PRODUCT_APPLICATION = 'PRODUCT_APPLICATION'
export const CATEGORY_SERVICE = 'CATEGORY_SERVICE'
export const PRODUCT_SERVICE = 'PRODUCT_SERVICE'
export const SUPPLIER_SERVICE = 'SUPPLIER_SERVICE'


@Module({})
export class CoreModule {

  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {

    const { categoryRepository, productRepository, supplierRepository } = adapters

    const ProductApplicationProvider = {
      provide: PRODUCT_APPLICATION,
      useFactory(product: ProductDomainService, category: CategoryDomainService, supplier: SupplierDomainService) {
        return new ProductApplicationService(product, category, supplier)
      },
      inject: [
        PRODUCT_SERVICE,
        CATEGORY_SERVICE,
        SUPPLIER_SERVICE
      ]
    }

    const CategoryServiceProvider = {
      provide: CATEGORY_SERVICE,
      useFactory(repository: CategoryRepository) {
        return new CategoryDomainService(repository)
      },
      inject:[
        categoryRepository
      ]
    }

    const SupplierServiceProvider = {
      provide: PRODUCT_SERVICE,
      useFactory(repository: ProductRepository) {
        return new ProductDomainService(repository)
      },
      inject:[
        productRepository
      ]
    }

    const ProductServiceProvider = {
      provide: SUPPLIER_SERVICE,
      useFactory(repository: SupplierRepository) {
        return new SupplierDomainService(repository)
      },
      inject:[
        supplierRepository
      ]
    }

    return {
      module: CoreModule,
      imports: [
        ...modules
      ],
      providers: [
        ProductApplicationProvider,
        CategoryServiceProvider,
        SupplierServiceProvider,
        ProductServiceProvider
      ],
      exports: [
        PRODUCT_APPLICATION
      ],
    }
  }

}

