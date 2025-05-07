import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ length: 320, unique: true })
    email: string;

    @Column({ length: 60 })
    pw: string;

    @Column({ length: 20, unique: true })
    name: string;

    @Column({ length: 1 })
    sex: string;

    @Column({ length: 30 })
    school: string;

    @Column({ length: 30 })
    account: string;
}