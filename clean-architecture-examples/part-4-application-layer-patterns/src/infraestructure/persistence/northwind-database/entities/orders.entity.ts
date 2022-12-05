import { Entity, Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CustomersEntity } from './customer.entity';
import { EmployeesEntity } from './employess.entity';
import { OrderDetailsEntity } from './order-details.entity';
import { ShippersEntity } from './shippers.entity';

@Entity({ name: 'orders' })
export class OrdersEntity {

    @PrimaryGeneratedColumn({ name: 'order_id' })
    orderId: number;
    
    @Column({ type: 'timestamp', name: 'order_date' })
    orderDate: Date;
    
    @Column({ type: 'timestamp', name: 'required_date' })
    requiredDate: Date;
    
    @Column({ type: 'timestamp', name: 'shipped_date' })
    shippedDate: Date;
    
    @Column({ name: 'freight' })
    freight: number;
    
    @Column({ name: 'ship_name' })
    shipName: string;
    
    @Column({ name: 'ship_address' })
    shipAddress: string;
    
    @Column({ name: 'ship_city' })
    shipCity: string;
    
    @Column({ name: 'ship_region' })
    shipRegion: string;
    
    @Column({ name: 'ship_postal_code' })
    shipPostalCode: string;
    
    @Column({ name: 'ship_country' })
    shipCountry: string;
    
    @Column({ name: 'ship_via' })
    shipperId: number;
    
    @JoinColumn({ name: 'ship_via' })
    @ManyToOne(() => ShippersEntity, (shipper) => shipper.orders)
    shipper: ShippersEntity;
    
    @Column({name: 'customer_id'})
    customerId: string;
    
    @JoinColumn({name: 'customer_id'})
    @ManyToOne(() => CustomersEntity, (customer) => customer.orders)
    customer: CustomersEntity;
    
    @Column({name: 'employee_id'})
    employeeId: number;
    
    @JoinColumn({name: 'employee_id'})
    @ManyToOne(() => EmployeesEntity, (employee) => employee.orders)
    employee: EmployeesEntity;
    
    @OneToMany(() => OrderDetailsEntity, (orderdetail) => orderdetail.order)
    orderDetails: OrderDetailsEntity[]

}