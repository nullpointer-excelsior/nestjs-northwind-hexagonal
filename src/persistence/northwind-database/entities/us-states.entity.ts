import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'us_states' })
export class UsStatesEntity {

    @PrimaryGeneratedColumn({ name: 'state_id' })
    stateId: number;
    @Column({ name: 'state_name' })
    stateName: string;
    @Column({ name: 'state_abbr' })
    stateAbbr: string;
    @Column({ name: 'state_region' })
    stateRegion: string;

}