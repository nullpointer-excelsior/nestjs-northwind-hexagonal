import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductApplicationService } from './application/ProductApplicationService';
import { CategoryService } from './domain/ports/services/CategoryService';
import { ProductService } from './domain/ports/services/ProductService';
import { SupplierService } from './domain/ports/services/SupplierService';
import { PRODUCT_APPLICATION } from './core.constants';

export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    productService: Type<ProductService>;
    categoryService: Type<CategoryService>;
    supplierService: Type<SupplierService>;
  }
}

@Module({})
export class CoreModule {

  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {

    const { productService, categoryService, supplierService } = adapters
    /**
     * use case ProductCreator provider
     */
    const ProductApplicationProvider = {
      provide: PRODUCT_APPLICATION,
      useFactory(product: ProductService, category: CategoryService, supplier: SupplierService) {
        return new ProductApplicationService(product, category, supplier)
      },
      inject: [
        productService, 
        categoryService, 
        supplierService
      ]
    }

    return {
      module: CoreModule,
      imports: [
        ...modules
      ],
      providers: [
        ProductApplicationProvider,
      ],
      exports: [
        PRODUCT_APPLICATION
      ],
    }
  }

}

