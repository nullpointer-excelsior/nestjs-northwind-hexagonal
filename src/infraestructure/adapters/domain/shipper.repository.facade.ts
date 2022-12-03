import { Injectable } from "@nestjs/common";
import { Shipper } from "../../../core/domain/Shipper";
import { ShipperRepository } from "../../../core/domain/ports/outbound/ShipperRepository";
import { MongoShipperRepository } from "./mongo-shipper.repository";

@Injectable()
export class ShipperRepositoryFacade implements ShipperRepository {
    
    constructor(
        private mongo: MongoShipperRepository
    ) {}

    findById(id: number): Promise<Shipper> {
        return this.mongo.findById(id)
    }


}