import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Supplier } from "../../core/domain/entities/Supplier";
import { SupplierRepository } from "../../core/domain/ports/outbound/SupplierRepository";
import { SupplierEntity } from "../northwind-database/entities/supplier.entity";

@Injectable()
export class SupplierRepositoryAdapter implements SupplierRepository {

    constructor(@InjectRepository(SupplierEntity) private repository: Repository<SupplierEntity>) { }

    async findById(id: number): Promise<Supplier> {
        return this.repository.findOneBy({ supplierId: id })
    }

}