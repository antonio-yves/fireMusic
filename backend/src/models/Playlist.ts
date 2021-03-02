import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne} from 'typeorm';
import User from './User';
import Music from './Music';
import MusicsPlaylist from './MusicsPlaylist';

@Entity('playlists')
export default class Playlist {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    playlistName: string;

    @Column()
    playlistDescription: string;

    @Column()
    isPublic: boolean;

    @Column()
    creationDate: Date;

    @ManyToOne(() => User, user => user.playlist)
    @JoinColumn({name: 'userId'})
    user: User;

    @OneToMany(() => MusicsPlaylist, musicsPlaylist => musicsPlaylist.playlist, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'playlistId'})
    musicsPlaylist: MusicsPlaylist[];
}