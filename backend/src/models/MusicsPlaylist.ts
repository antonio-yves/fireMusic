import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Playlist from './Playlist';
import Music from './Music';

@Entity('musicsPlaylist')
export default class MusicsPlaylist {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Playlist, playlist => playlist.musicsPlaylist, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'playlistId'})
    playlist: Playlist;

    @ManyToOne(() => Music, music => music.musicsPlaylist, {
        cascade: ['insert', 'update']
    })
    music: Music;

}