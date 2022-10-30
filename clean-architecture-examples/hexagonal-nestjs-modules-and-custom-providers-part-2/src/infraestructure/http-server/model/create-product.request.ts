import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
    
    @ApiProperty({
        description: 'Nombre producto',
    })
    name: string;
    
    @ApiProperty({
        description: 'Precio de producto',
        type: Number,
        example: '10000',
    })
    price: number;

    @ApiProperty({
        description: 'Id de Proveedor',
        default: 1,
        type: Number
    })
    
    categoryId: number;
    
    @ApiProperty({
        description: 'Id de Proveedor',
        default: 1,
        type: Number
    })
    supplierId: number;

}