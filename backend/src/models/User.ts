import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BeforeInsert, BeforeUpdate} from 'typeorm';
import Image from './Image';
import bcrypt from 'bcryptjs';
import Artist from './Artist';

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

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

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

    @OneToOne(type => Artist, artist => artist.user)
    artist: Artist;
}