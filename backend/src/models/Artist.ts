import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Album from './Album';
import User from './User';

@Entity('artists')
export default class Artist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    generos: string;

    @OneToOne(type => User, user => user.artist)
    @JoinColumn({name: "userId"})
    user: User;

    @OneToOne(type => Album, album => album.artist)
    album: Album;
}