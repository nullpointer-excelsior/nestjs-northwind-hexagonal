import { Shipper } from "../../domain/Shipper";
import { ShippingLocation } from "../../domain/vo/ShippingLocation";

export interface ShippingDto {
    shipper: Shipper;
    freight: number;
    shippedDate: Date;
    destination: ShippingLocation
}