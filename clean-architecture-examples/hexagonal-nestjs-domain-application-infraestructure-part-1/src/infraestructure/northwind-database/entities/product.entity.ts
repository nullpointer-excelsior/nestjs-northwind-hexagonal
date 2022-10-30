import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { SupplierEntity } from './supplier.entity';

@Entity({ name: 'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn({name: 'product_id'})
    productId: number;
    @Column({ name: 'product_name'})
    productName: string;
    @Column({ name: 'quantity_per_unit'})
    quantityPerUnit: number;
    @Column({ name: 'unit_price'})
    unitPrice: number;
    @Column({ name: 'units_in_stock'})
    unitsInStock: number;
    @Column({ name: 'units_on_order'})
    unitsOnOrder: number;
    @Column({ default: false })
    discontinued: boolean;
    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: "category_id" })
    category: CategoryEntity;
    @ManyToOne(() => SupplierEntity)
    @JoinColumn({ name: "supplier_id" })
    supplier: SupplierEntity;
    
}