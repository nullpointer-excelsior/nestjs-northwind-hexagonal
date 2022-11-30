import { ApiProperty } from "@nestjs/swagger";

export class OrderDetailsRequest {
    @ApiProperty({
        description: 'product id',
    })
    productId: number;
    @ApiProperty({
        description: 'unit price',
    })
    unitPrice: number;
    @ApiProperty({
        description: 'queantity',
    })
    quantity: number;
    @ApiProperty({
        description: 'discount',
    })
    discount: number;
}

export class CreateOrderRequest {
    @ApiProperty({
        description: 'Order date',
    })
    requiredDate: Date;
    @ApiProperty({
        description: 'shipped date',
    })
    shippedDate: Date;
    @ApiProperty({
        description: 'freight',
    })
    freight: number;
    @ApiProperty({
        description: 'freight',
    })
    shipName: string;
    @ApiProperty({
        description: 'freight',
    })
    shipAddress: string;
    @ApiProperty()
    shipCity: string;
    @ApiProperty()
    shipRegion: string;
    @ApiProperty()
    shipPostalCode: string;
    @ApiProperty()
    shipCountry: string;
    @ApiProperty()
    shipperId: number;
    @ApiProperty()
    customerId: string;
    @ApiProperty()
    employeeId: number;

    orderDetails: OrderDetailsRequest[];
    
}