import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { timeStamp } from "console";
import { Repository } from "typeorm";
import { ShipperRepository } from "../../../core/domain/ports/outbound/ShipperRepository";
import { Shipper } from "../../../core/domain/Shipper";
import { ShippersEntity } from "../../persistence/northwind-database/entities/shippers.entity";

@Injectable()
export class PostgresShipperRepository  implements ShipperRepository {

    constructor(@InjectRepository(ShippersEntity) private repository: Repository<ShippersEntity>) { }

    async findById(id: any): Promise<Shipper> {
        return this.repository.findOneBy({ shipperId: id})
    }

    async findAll(){
        return this.repository.find()
    }
}