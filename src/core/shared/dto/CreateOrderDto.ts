
export interface OrderDetailsDto {
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
}

export interface CreateOrderDto {
    
    orderId: number;
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    shipperId: number;
    customerId: string;
    employeeId: number;
    orderDetails: OrderDetailsDto[];
    
}