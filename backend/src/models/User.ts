import { Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import Image from './Image';

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthDate: Date;

    @Column()
    country: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    isArtist: boolean;

    @OneToOne(type => Image, image => image.user)
    image: Image;
}