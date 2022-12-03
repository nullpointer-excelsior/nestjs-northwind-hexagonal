import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Shipper } from "../../../core/domain/Shipper";
import { ShipperRepository } from "../../../core/domain/ports/outbound/ShipperRepository";
import { ShipperDocument } from "../../persistence/southwind-database/model/shipper.schema";


@Injectable()
export class MongoShipperRepository implements ShipperRepository {

    constructor(@InjectModel('Shipper') private model: Model<ShipperDocument>) {}

    async findById(id: number): Promise<Shipper> {
        return this.model
            .findOne({ shipperId: id })
            .exec()
            .then(doc => this.map(doc));
    }

    async save(c: Shipper){
        const employee = new this.model({
            ...c
        })
        await employee.save()
    }

    async count(): Promise<number> {
        return this.model.count()
    }

    map(doc: ShipperDocument) {
       return {
        ...doc
       }
    }

}