import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shipper } from "../../../core/domain/entities/Shipper";
import { ShippersEntity } from "../northwind-database/entities/shippers.entity";

@Injectable()
export class PostgresShipperRepository  {

    constructor(@InjectRepository(ShippersEntity) private repository: Repository<ShippersEntity>) { }

    async findAll(): Promise<Shipper[]> {
        return this.repository.find()
    }
}