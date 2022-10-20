import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductCreator } from './application/services/ProductCreator';
import { CategoryService } from './domain/ports/services/CategoryService';
import { ProductService } from './domain/ports/services/ProductService';

export type CoreModuleOptions = {
  module: Type;
  productService: Type<ProductService>;
  categoryService: Type<CategoryService>;
}

@Module({})
export class CoreModule {

  static register({ module, productService, categoryService }: CoreModuleOptions): DynamicModule {
    /**
     * use case ProductCreator provider
     */
    const productCreatroProvider = {
      provide: ProductCreator,
      useFactory(product: ProductService, category: CategoryService) {
        return new ProductCreator(product, category)
      },
      inject: [productService, categoryService]
    }

    return {
      module: CoreModule,
      imports: [
        module
      ],
      providers: [
        productCreatroProvider
      ],
      exports: [ProductCreator],
    }
  }

}

