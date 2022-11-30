export interface DetailCreated {
    product: {
        productId: number;
        productName: string;
    };
    unitPrice: number;
    quantity: number;
    discount: number;
}
export interface OrderCreatedDto {
    orderId: any;
    customer: {
        customerId: string;
        contactName: string;
        contactTitle: string;
        companyName: string;
        address: string;
        city: string;
        region: string;
        country: string;
        phone: string;
    }
    employee: {
        employeeId: number;
        lastName: string;
        firstName: string;
        title: string;
        titleOfCourtesy: string;
        extension: string;
    };
    orderDate: Date;
    shipping: {
        name: string,
        address: string,
        city: string,
        region: string,
        country: string
    }
    details: DetailCreated[]
}