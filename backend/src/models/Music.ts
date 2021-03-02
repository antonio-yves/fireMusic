import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import Album from './Album';
import MusicsPlaylist from './MusicsPlaylist';
import Playlist from './Playlist';

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

    @OneToMany(() => MusicsPlaylist, musicsPlaylist => musicsPlaylist.music, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'musicId'})
    musicsPlaylist: MusicsPlaylist[];
}


