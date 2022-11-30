import { Injectable } from "@nestjs/common";
import { Detail } from "../../../core/domain/vo/Detail";
import { Mapper } from "../../../core/shared/Mapper";
import { OrderDetailsEntity } from "../../persistence/northwind-database/entities/order-details.entity";

@Injectable()
export class DetailsMapper implements Mapper<OrderDetailsEntity[], Detail[]> {
    
    map(entities: OrderDetailsEntity[]): Detail[] {
        
        return entities.map(detail => new Detail({
            ...detail,
            discount: detail.discount,
            unitPrice: detail.unitPrice
        }))

    }

}