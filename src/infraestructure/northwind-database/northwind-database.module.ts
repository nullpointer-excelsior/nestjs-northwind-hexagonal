import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { SupplierEntity } from './entities/supplier.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'northwind',
            password: 'northwind',
            database: 'northwind',
            entities: [
                ProductEntity,
                CategoryEntity,
                SupplierEntity
            ],
            synchronize: false,
            logging:['query']
        }),
    ]
})
export class NorthwindDatabaseModule { }
