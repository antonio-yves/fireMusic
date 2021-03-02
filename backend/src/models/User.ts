import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, BeforeInsert, BeforeUpdate, JoinColumn} from 'typeorm';
import Image from './Image';
import bcrypt from 'bcryptjs';
import Artist from './Artist';
import Playlist from './Playlist';
import Album from './Album';

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

    @OneToMany(() => Playlist, playlist => playlist.user)
    @JoinColumn({name: 'userId'})
    playlist: Playlist[];
}