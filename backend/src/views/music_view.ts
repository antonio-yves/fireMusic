import Music from '../models/Music';

export default {
    render(music: Music) {
        return {
            musicId: music.id,
            musicName: music.musicName,
            musicArtist: music.album.artist.user.name,
            musicAlbum: music.album.nome,
            musicComposer: music.composer,
            musicDuration: music.musicDuration,
            musicAlbumTrack: music.trackNumber,
            musicPath: music.path,
        };
    },
    renderMany(musics: Music[]) {
        return musics.map(music => this.render(music));
    }
}