import { Entity, Column, ManyToOne, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'order_details' })
export class OrderDetailsEntity {

    @PrimaryColumn({ name: 'order_id' })
    orderId: number;

    @PrimaryColumn({name: 'product_id'})
    productId: number;   

    @JoinColumn({ name: 'product_id'})
    @ManyToOne(() => ProductEntity)
    product: ProductEntity;
    
    @JoinColumn({ name: 'order_id'})
    @ManyToOne(() => OrdersEntity, (order) => order.orderDetails)
    order: OrdersEntity;
    
    @Column({ name: 'unit_price' })
    unitPrice: number;
    
    @Column({ name: 'quantity' })
    quantity: number;
    
    @Column({ name: 'discount' })
    discount: number;

}