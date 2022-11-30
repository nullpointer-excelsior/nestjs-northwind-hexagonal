import { ValueObject } from "../../shared/ValueObject";

export class Discount extends ValueObject<number> {
    
    constructor(value: number) {
        super(value, `${value} discount cannot be applied`)
    }
    
    protected validate(value: number): boolean {
        return value >= 0 && value < 1
    }

}