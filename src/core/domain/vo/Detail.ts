import { Product } from "../Product";
import { Discount } from "./Discount";
import { UnitPrice } from "./Unitprice";

interface Props {
    product: Product;
    unitPrice: UnitPrice | number;
    discount: Discount | number;
    quantity: number;
}

export class Detail {

    readonly product: Product;
    readonly unitPrice: UnitPrice;
    readonly quantity: number;
    readonly discount: Discount;

    constructor(props: Props) {
        this.discount = typeof props.discount === 'number' ? new Discount(props.discount) : props.discount
        this.product = props.product
        this.unitPrice = typeof props.unitPrice === 'number' ? new UnitPrice(props.unitPrice): props.unitPrice
        this.quantity = props.quantity
    }

}