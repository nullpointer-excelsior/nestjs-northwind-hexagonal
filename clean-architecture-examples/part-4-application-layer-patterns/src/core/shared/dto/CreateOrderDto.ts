
export interface CreateDetailDTO {
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
}

export interface CreateOrderDto {
    customerId: string;
    employeeId: number;
    shipperId: number;
    requiredDate: Date;
    shippedDate: Date;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    details: CreateDetailDTO[];
}