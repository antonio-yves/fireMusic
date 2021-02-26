import AlbumCover from '../models/AlbumCover';

export default {
    render(albumCover: AlbumCover) {
        return {
            id: albumCover.id,
            coverPath: albumCover.path,
            album: albumCover.album.nome 
        };
    },
    renderMany(albumCovers: AlbumCover[]) {
        return albumCovers.map(albumCover => this.render(albumCover));
    }
}