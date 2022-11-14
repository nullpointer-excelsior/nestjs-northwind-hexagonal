import { ValueObject } from "../ValueObject"
import { v4 as uuidv4 } from 'uuid';

export class Id extends ValueObject<string> {
    
    constructor(private id: string) {
        super(id, `Invalid UUID Id:${id} `)
    }

    validate(id: string) {
        const re  =  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        return re.test(id)
    }

    static generate() {
        return new Id(uuidv4())
    }

    static string() {
        return String(uuidv4())
    }
    
}