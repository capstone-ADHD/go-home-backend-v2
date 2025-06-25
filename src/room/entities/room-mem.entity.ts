import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Room } from './room.entity';

@Entity("roomMem")
export class roomMem {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ unsigned: true })
    user_id: number;

    @ManyToOne(() => Room, room => room.room_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id' })
    room: Room;
}
