import { Supplier } from "../../entities/Supplier";

export interface SupplierRepository {

    findById(id: number): Promise<Supplier>;
    
}