import Album from '../models/Album';

export default {
    render(album: Album) {
        return {
            albumId: album.id,
            albumName: album.nome,
            albumArtist: album.artist,
            albumCopyright: album.copyright,
            algumGeneros: album.generos,
            albumLauch: album.lancamento,
            albumTrackNumber: album.trackNumber,
        }
    },
    renderMany(albuns: Album[]) {
        return albuns.map(album => this.render(album));
    }
}