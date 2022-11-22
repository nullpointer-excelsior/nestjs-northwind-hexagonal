import { Injectable } from "@nestjs/common";
import { PostgresShipperRepository } from "../../../infraestructure/persistence/repositories/postgres-shipper.repository";
import { Shipper } from "../../domain/entities/Shipper";

@Injectable()
export class SearchShipperService {

    constructor(private repository: PostgresShipperRepository) {}

    findAll(): Promise<Shipper[]> {
        return this.repository.findAll()
    }
    
}