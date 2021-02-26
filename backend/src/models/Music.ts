import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import Album from './Album';

@Entity('musics')
export default class Music {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    musicName: string;
    
    @Column()
    composer: string;

    @Column()
    musicDuration: number;

    @Column()
    path: string;

    @Column()
    trackNumber: number;

    @OneToOne(type => Album, album => album.music)
    @JoinColumn({name: 'albumId'})
    album: Album;
}


