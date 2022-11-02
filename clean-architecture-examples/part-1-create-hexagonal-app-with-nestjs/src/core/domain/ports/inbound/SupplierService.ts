import { Supplier } from "../../entities/Supplier";

export interface SupplierService {

    findById(id: number): Promise<Supplier>;
    
}