import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { CustomerDemographicEntity } from './customer-demographics.entity';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'customers' })
export class CustomersEntity {

    @PrimaryColumn({ name: 'customer_id' })
    customerId: string;

    @Column({ name: 'company_name' })
    companyName: string;
    
    @Column({ name: 'contact_name' })
    contactName: string;
    
    @Column({ name: 'contact_title' })
    contactTitle: string;
    
    @Column({ name: 'address'})
    address: string;
    
    @Column({ name: 'city'})
    city: string;
    
    @Column({ name: 'region'})
    region: string;
    
    @Column({ name: 'postal_code'})
    postalCode: string;
    
    @Column({ name: 'country'})
    country: string;
    
    @Column({ name: 'phone'})
    phone: string;
    
    @Column({ name: 'fax'})
    fax: string;
    
    @ManyToMany(() => CustomerDemographicEntity, (customerDemographic) => customerDemographic.customers)
    @JoinTable()
    customerDemographics: CustomerDemographicEntity[]
    
    @OneToMany(() => OrdersEntity, (order) => order.customer)
    orders: OrdersEntity[]
    
}