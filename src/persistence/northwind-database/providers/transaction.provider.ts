import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";

@Injectable()
export class TransactionProvider {

    constructor(private readonly datasource: DataSource) {}

    async transacction<T>(callback: (entityManager: EntityManager) => Promise<T>) {
        return await this.datasource.transaction(async (manager: EntityManager) => {
            return callback(manager)
        })
    }

}