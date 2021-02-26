import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import Album from './Album';

@Entity('albumCover')
export default class AlbumCover {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(type => Album, album => album.cover)
    @JoinColumn({name: 'album_id'})
    album: Album;
    
}