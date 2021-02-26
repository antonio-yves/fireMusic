import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import AlbumCover from './AlbumCover';
import Artist from './Artist';
import Music from './Music';

@Entity('albuns')
export default class Album {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    copyright: string;

    @Column()
    generos: string;

    @Column()
    isComplete: boolean;

    @Column()
    isSingle: boolean;

    @Column()
    gravadora: string;

    @Column()
    lancamento: Date;

    @Column()
    trackNumber: number;

    @OneToOne(type => AlbumCover, cover => cover.album)
    cover: AlbumCover;

    @OneToOne(type => Artist, artist => artist.user)
    @JoinColumn({name: 'artist'})
    artist: Artist;

    @OneToOne(type => Music, music => music.album) 
    music: Music;
}