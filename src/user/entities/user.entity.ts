import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    user_id: number;

    @Column({ length: 320, unique: true })
    user_email: string;

    @Column({ length: 60 })
    user_pw: string;

    @Column({ length: 20, unique: true })
    user_name: string;

    @Column({ length: 1 })
    sex: string;

    @Column({ length: 30 })
    school: string;

    @Column({ length: 30 })
    account: string;    

    @Column({ type:"varchar",length: 162,nullable: true })
    device_token: string | null;
}