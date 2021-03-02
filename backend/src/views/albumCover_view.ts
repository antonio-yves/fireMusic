import AlbumCover from '../models/AlbumCover';

export default {
    render(albumCover: AlbumCover) {
        return {
            albumCoverId: albumCover.id,
            albumCoverPath: albumCover.path,
            album: albumCover.album.nome,
        };
    },
    renderMany(albumCovers: AlbumCover[]) {
        return albumCovers.map(albumCover => this.render(albumCover));
    }
}