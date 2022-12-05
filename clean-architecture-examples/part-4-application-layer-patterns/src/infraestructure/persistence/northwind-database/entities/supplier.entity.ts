import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'suppliers' })
export class SupplierEntity {
    @PrimaryColumn({ name: 'supplier_id' })
    supplierId: number;
    @Column({ name: 'company_name' })
    companyName: string;
    @Column({ name: 'contact_name' })
    contactName: string;
    @Column({ name: 'contact_title' })
    contactTitle: string;
    @Column({ name: 'address' })
    address: string;
    @Column({ name: 'city' })
    city: string;
    @Column({ name: 'postal_code' })
    postalCode: string;
    @Column({ name: 'country' })
    country: string;
    @Column({ name: 'phone' })
    phone: string;
    @Column({ name: 'homepage' })
    homepage: string;
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}