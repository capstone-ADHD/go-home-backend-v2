import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { roomMem } from './room-mem.entity';

@Entity("room")
export class Room {
    @PrimaryGeneratedColumn({ unsigned: true })
    room_id:number;

    @Column({length:50})
    title:string;

    @Column({})
    owner_id:number;

    @Column({length:30})
    school:string

    @Column({})
    meet_at:string;

    @Column({length:100})
    from:string;

    @Column({length:100})
    to:string;

    @Column({})
    max_amount:number;
}
