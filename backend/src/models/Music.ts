import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
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

    @ManyToOne(() => Album, album => album.musics)
    @JoinColumn({name: 'albumId'})
    album: Album;
}


