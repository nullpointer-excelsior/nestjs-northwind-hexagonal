import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShipperRepository } from "../../../core/Orders/domain/ports/outbound/ShipperRepository";
import { Shipper } from "../../../core/Orders/domain/Shipper";
import { ShippersEntity } from "../../persistence/northwind-database/entities/shippers.entity";


@Injectable()
export class ShipperRepositoryAdapter  implements ShipperRepository {

    constructor(@InjectRepository(ShippersEntity) private repository: Repository<ShippersEntity>) { }

    async findById(id: any): Promise<Shipper> {
        return this.repository.findOneBy({ shipperId: id})
    }
}