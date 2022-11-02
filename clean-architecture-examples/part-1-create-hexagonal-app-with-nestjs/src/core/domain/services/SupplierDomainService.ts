import { Supplier } from "../entities/Supplier";
import { SupplierService } from "../ports/inbound/SupplierService";
import { SupplierRepository } from "../ports/outbound/SupplierRepository";

export class SupplierDomainService implements SupplierService {

    constructor(private repository: SupplierRepository) {}

    findById(id: number): Promise<Supplier> {
        return this.repository.findById(id)
    }

}