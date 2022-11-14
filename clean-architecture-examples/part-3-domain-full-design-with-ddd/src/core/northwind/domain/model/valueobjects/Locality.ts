export class Locality {
    
    constructor(
        public readonly address: string, 
        public readonly city: string,
        public readonly region: string,
        public readonly country: string,
    ) {}

    getValues() {
        return {
            address: this.address,
            city: this.city,
            region: this.region,
            country: this.country
        }
    }
}