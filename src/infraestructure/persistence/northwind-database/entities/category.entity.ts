import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity {

    @PrimaryGeneratedColumn({ name: 'category_id' })
    categoryId: number;
    
    @Column({ name: 'category_name' })
    categoryName: string;
    
    @Column()
    description: string;
    
    @Column()
    picture: string;
    
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
    
}