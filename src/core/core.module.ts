import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductCreatorApplication } from './application/ProductCreatorApplication';
import { CategoryService } from './domain/ports/services/CategoryService';
import { ProductService } from './domain/ports/services/ProductService';
import { SupplierService } from './domain/ports/services/SupplierService';
import { PRODUCT_CREATOR } from './injection.tokens';

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
    const productCreatorProvider = {
      provide: PRODUCT_CREATOR,
      useFactory(product: ProductService, category: CategoryService, supplierService: SupplierService) {
        return new ProductCreatorApplication(product, category, supplierService)
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
        productCreatorProvider,
      ],
      exports: [
        PRODUCT_CREATOR
      ],
    }
  }

}

