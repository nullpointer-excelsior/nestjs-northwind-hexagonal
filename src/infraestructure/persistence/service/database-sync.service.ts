import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoCustomerRepository } from "../../adapters/domain/mongo-customer.repository";
import { MongoEmployeeRepository } from "../../adapters/domain/mongo-employee.repository";
import { MongoOrderRepository } from "../../adapters/domain/mongo-order.repository";
import { MongoProductRepository } from "../../adapters/domain/mongo-product.repository";
import { MongoShipperRepository } from "../../adapters/domain/mongo-shipper.repository";
import { PostgresCustomerRepository } from "../../adapters/domain/postgres-customer.repository";
import { PostgresEmployeeRepository } from "../../adapters/domain/postgres-employee.repository";
import { PostgresOrderRepository } from "../../adapters/domain/postgres-order.repository";
import { PostgresProductRepository } from "../../adapters/domain/postgres-product.repository";
import { PostgresShipperRepository } from "../../adapters/domain/postgres-shipper.repository";

@Injectable()
export class DatabaseSyncService {
    constructor(
        private postgres: PostgresOrderRepository,
        private mongo: MongoOrderRepository,
        private productMongo: MongoProductRepository,
        private productPostgres: PostgresProductRepository,
        private customerMongo: MongoCustomerRepository,
        private customerPostgres: PostgresCustomerRepository,
        private employeeMongo: MongoEmployeeRepository,
        private employeePostgres: PostgresEmployeeRepository,
        private shipperMongo: MongoShipperRepository,
        private shipperPostgres: PostgresShipperRepository
    ) { }

    async syncOrders() {
        const count = await this.mongo.count()
        if (count === 0) {
            Logger.log('Staring to sync orders...')
            const records = await this.postgres.findBySlice(1000, 0)
            let result = 0
            for (let r of records) {
                await this.mongo.save(r)
                result += 1
            }
            console.log(`Detail Records inserted on mongo: ${result}`)
        }
    }

    async syncProducts() {
        const count = await this.productMongo.count()
        if (count === 0) {
            Logger.log('Staring to sync products...')
            const records = await this.productPostgres.findAll()
            let result = 0
            for (let r of records) {
                await this.productMongo.save(r)
                result += 1
            }
            console.log(`Products Records inserted on mongo: ${result}`)
        }
    }

    async syncCustomer() {
        const count = await this.customerMongo.count()
        if (count === 0) {
            Logger.log('Staring to sync customer...')
            const records = await this.customerPostgres.findAll()
            let result = 0
            for (let r of records) {
                await this.customerMongo.save(r)
                result += 1
            }
            console.log(`Customer Records inserted on mongo: ${result}`)
        }
    }

    async syncEmployee() {
        const count = await this.employeeMongo.count()
        if (count === 0) {
            Logger.log('Staring to sync employee...')
            const records = await this.employeePostgres.findAll()
            let result = 0
            for (let r of records) {
                await this.employeeMongo.save(r)
                result += 1
            }
            console.log(`employee Records inserted on mongo: ${result}`)
        }
    }

    async syncShipper() {
        const count = await this.shipperMongo.count()
        if (count === 0) {
            Logger.log('Staring to sync shipper...')
            const records = await this.shipperPostgres.findAll()
            let result = 0
            for (let r of records) {
                await this.shipperMongo.save(r)
                result += 1
            }
            console.log(`shipper Records inserted on mongo: ${result}`)
        }
    }
}