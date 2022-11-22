import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../shared/config/database.config';
import { CategoryEntity } from './entities/category.entity';
import { CustomerDemographicEntity } from './entities/customer-demographics.entity';
import { CustomersEntity } from './entities/customer.entity';
import { EmployeesEntity } from './entities/employess.entity';
import { OrderDetailsEntity } from './entities/order-details.entity';
import { OrdersEntity } from './entities/orders.entity';
import { ProductEntity } from './entities/product.entity';
import { RegionEntity } from './entities/region.entity';
import { ShippersEntity } from './entities/shippers.entity';
import { SupplierEntity } from './entities/supplier.entity';
import { TerritoriesEntity } from './entities/territories.entity';
import { TransactionProvider } from './providers/transaction.provider';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const database = config.get<DatabaseConfig>('database')
                return {
                    type: 'postgres',
                    host: database.host,
                    port: database.port,
                    username: database.user,
                    password: database.password,
                    database: database.name,
                    entities: [
                        ProductEntity,
                        CategoryEntity,
                        SupplierEntity,
                        CustomersEntity,
                        CustomerDemographicEntity,
                        OrdersEntity,
                        ShippersEntity,
                        EmployeesEntity,
                        TerritoriesEntity,
                        RegionEntity,
                        OrdersEntity,
                        OrderDetailsEntity
                    ],
                    synchronize: false,
                    logging: ['query']
                }
            },
            inject: [ConfigService],
        })
    ],
    providers: [
        TransactionProvider
    ],
    exports: [
        TransactionProvider
    ]
})
export class NorthwindDatabaseModule {}
