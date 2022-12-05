import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'shippers' })
export class ShippersEntity {

    @PrimaryColumn({ name: 'shipper_id' })
    shipperId: number;
    @Column({ name: 'company_name' })
    companyName: string;
    @Column({ name: 'phone' })
    phone: string;
    @OneToMany(() => OrdersEntity, (order) => order.shipper)
    orders: OrdersEntity[];
}