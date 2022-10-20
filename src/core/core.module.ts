import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductCreator } from './application/ProductCreator';
import { CategoryService } from './domain/ports/services/CategoryService';
import { ProductService } from './domain/ports/services/ProductService';

export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    productService: Type<ProductService>;
    categoryService: Type<CategoryService>;
  }
}

@Module({})
export class CoreModule {

  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {

    const { productService, categoryService } = adapters
    /**
     * use case ProductCreator provider
     */
    const productCreatorProvider = {
      provide: ProductCreator,
      useFactory(product: ProductService, category: CategoryService) {
        return new ProductCreator(product, category)
      },
      inject: [productService, categoryService]
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
        ProductCreator
      ],
    }
  }

}

