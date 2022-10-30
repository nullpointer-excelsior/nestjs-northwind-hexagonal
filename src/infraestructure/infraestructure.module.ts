import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { CategoryRepositoryAdapter } from './adapters/category.repository.adapter';
import { ProductRepositoryAdapter } from './adapters/product.repository.adapter';
import { SupplierRepositoryAdapter } from './adapters/supplier.repository.adapter';
import { ProductController } from './http-server/controllers/product.controller';
import { RootController } from './http-server/controllers/root.controller';
import { CategoryEntity } from './northwind-database/entities/category.entity';
import { ProductEntity } from './northwind-database/entities/product.entity';
import { SupplierEntity } from './northwind-database/entities/supplier.entity';
import { NorthwindDatabaseModule } from './northwind-database/northwind-database.module';
import { SharedModule } from './shared/shared.module';

@Module({
    providers: [
        ProductRepositoryAdapter,
        SupplierRepositoryAdapter,
        CategoryRepositoryAdapter
    ],
    exports: [
        ProductRepositoryAdapter,
        SupplierRepositoryAdapter,
        CategoryRepositoryAdapter
    ],
    imports: [
        NorthwindDatabaseModule,
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
        TypeOrmModule.forFeature([
            CategoryEntity,
            ProductEntity,
            SupplierEntity
        ])
    ],
    controllers:[
        ProductController,
        RootController
    ]
})
export class InfraestructureModule {}
