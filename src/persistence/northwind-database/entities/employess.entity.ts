import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { TerritoriesEntity } from './territories.entity';

@Entity({ name: 'employees' })
export class EmployeesEntity {

    @PrimaryColumn({ name: 'employee_id' })
    employeeId: number;
    
    @Column({ name: 'last_name' })
    lastName: string;
    
    @Column({ name: 'first_name' })
    firstName: string;
    
    @Column({ name: 'title' })
    title: string;
    
    @Column({ name: 'title_of_courtesy' })
    titleOfCourtesy: string;
    
    @Column({ type: 'timestamp', name: 'birth_date' })
    birthDate: Date;
    
    @Column({ type: 'timestamp', name: 'hire_date' })
    hireDate: Date;
    
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
    
    @Column({ name: 'home_phone'})
    homePhone: string;
    
    @Column({ name: 'extension'})
    extension: string;
    
    @Column({ name: 'notes' })
    notes: string;
    
    @Column({ name: 'reports_to' })
    reportsTo: number;
    
    @Column({ name: 'photo_path'})
    photoPath: string;
    
    @ManyToMany(() => TerritoriesEntity, (territories) => territories.employees)
    @JoinTable()
    territories: TerritoriesEntity[]
    
    @OneToMany(() => OrdersEntity, (order) => order.employee)
    orders: OrdersEntity[]
    
}