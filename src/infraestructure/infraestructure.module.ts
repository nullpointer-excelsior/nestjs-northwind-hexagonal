import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepositoryAdapter } from './adapters/category.repository.adapter';
import { ProductRepositoryAdapter } from './adapters/product.repository.adapter';
import { SupplierRepositoryAdapter } from './adapters/supplier.repository.adapter';
import { HttpServerModule } from './http-server/http-server.module';
import { CategoryEntity } from './northwind-database/entities/category.entity';
import { ProductEntity } from './northwind-database/entities/product.entity';
import { SupplierEntity } from './northwind-database/entities/supplier.entity';
import { NorthwindDatabaseModule } from './northwind-database/northwind-database.module';

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
        HttpServerModule,
        TypeOrmModule.forFeature([
            CategoryEntity,
            ProductEntity,
            SupplierEntity
        ])
    ]
})
export class InfraestructureModule { }
