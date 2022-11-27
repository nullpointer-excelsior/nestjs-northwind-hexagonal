import { Shipper } from "../../Shipper";

export interface ShipperRepository {
    findById(id: any): Promise<Shipper>
}