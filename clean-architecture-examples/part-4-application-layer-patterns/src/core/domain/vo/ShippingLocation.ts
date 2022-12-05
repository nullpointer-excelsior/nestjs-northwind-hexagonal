
export class ShippingLocation {
    
    constructor(
        public readonly name: string,
        public readonly address: string,
        public readonly city: string,
        public readonly region: string,
        public readonly country: string
    ) { 
        
    }
}