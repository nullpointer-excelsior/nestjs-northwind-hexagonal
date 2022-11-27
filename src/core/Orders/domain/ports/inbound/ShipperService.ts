import { EntityNotFoundException } from "../../../../shared/exception/EntityNotFoundException"
import { Shipper } from "../../Shipper"
import { ShipperRepository } from "../outbound/ShipperRepository"

export class ShipperService {
    
    constructor(private readonly shipper: ShipperRepository) {}

    async findById(id: any): Promise<Shipper> {
        
        const shipper = await this.shipper.findById(id)
        if (!shipper) {
            throw new EntityNotFoundException(`Shipper(id="${id}") not found`)
        }
        return shipper

    }
}