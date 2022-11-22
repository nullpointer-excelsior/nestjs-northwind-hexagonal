import { Shipper } from "../domain/entities/Shipper";

export interface SearchShippers {

    findAll(): Promise<Shipper[]>;

}