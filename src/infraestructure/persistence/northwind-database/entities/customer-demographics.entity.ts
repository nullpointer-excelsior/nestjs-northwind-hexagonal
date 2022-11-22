import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { CustomersEntity } from './customer.entity';

@Entity({ name: 'customers' })
export class CustomerDemographicEntity {

    @PrimaryGeneratedColumn({ name: 'customer_type_id' })
    customerTypeId: string;
    @Column({ name: 'customer_desc' })
    customerDesc: string;
    @ManyToMany(() => CustomersEntity, (c) => c.customerDemographics)
    customers: CustomersEntity[]
}