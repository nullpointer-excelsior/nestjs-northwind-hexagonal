import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { CategoryServiceAdapter } from './adapters/category.service.adapter';
import { ProductServiceAdapter } from './adapters/product.service.adapter';
import { SupplierServiceAdapter } from './adapters/supplier.service.adapter';
import { ProductController } from './http-server/controllers/product.controller';
import { CategoryEntity } from './northwind-database/entities/category.entity';
import { ProductEntity } from './northwind-database/entities/product.entity';
import { SupplierEntity } from './northwind-database/entities/supplier.entity';
import { NorthwindDatabaseModule } from './northwind-database/northwind-database.module';

@Module({
    providers: [
        ProductServiceAdapter,
        CategoryServiceAdapter,
        SupplierServiceAdapter,
    ],
    exports: [
        ProductServiceAdapter,
        CategoryServiceAdapter,
        SupplierServiceAdapter
    ],
    imports: [
        NorthwindDatabaseModule,
        CoreModule.register({
            modules: [
               InfraestructureModule
            ],
            adapters: {
              productService: ProductServiceAdapter,
              categoryService: CategoryServiceAdapter,
              supplierService: SupplierServiceAdapter
            }
          }),
        TypeOrmModule.forFeature([
            CategoryEntity,
            ProductEntity,
            SupplierEntity
        ])
    ],
    controllers:[
        ProductController
    ]
})
export class InfraestructureModule {}
