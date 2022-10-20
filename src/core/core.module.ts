import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductCreator } from './application/services/ProductCreator';
import { CategoryService } from './domain/ports/services/CategoryService';
import { ProductService } from './domain/ports/services/ProductService';

export type CoreModuleOptions = {
  modules: Type[];
  productService: Type<ProductService>;
  categoryService: Type<CategoryService>;
}

@Module({})
export class CoreModule {

  static register({ modules, productService, categoryService }: CoreModuleOptions): DynamicModule {
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
        ...modules
      ],
      providers: [
        productCreatroProvider
      ],
      exports: [ProductCreator],
    }
  }

}

