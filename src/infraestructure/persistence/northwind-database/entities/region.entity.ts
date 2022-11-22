import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TerritoriesEntity } from './territories.entity';

@Entity({ name: 'region' })
export class RegionEntity {

    @PrimaryGeneratedColumn({ name: 'region_id' })
    regionId: number;
    @Column({ name: 'region_description' })
    regionDescription: string;
    @OneToMany(() => TerritoriesEntity, (territoy) => territoy.region)
    territories: TerritoriesEntity[]
}