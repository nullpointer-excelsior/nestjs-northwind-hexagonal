import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { EmployeesEntity } from './employess.entity';
import { RegionEntity } from './region.entity';

@Entity({ name: 'territories' })
export class TerritoriesEntity {

    @PrimaryGeneratedColumn({ name: 'territory_id' })
    territoryId: number;
    @Column({ name: 'territory_description' })
    territoryDescription: string;
    @ManyToOne(() => RegionEntity, (region) => region.territories)
    region: RegionEntity
    @ManyToMany(() => EmployeesEntity, (employees) => employees.territories)
    employees: EmployeesEntity[]
}