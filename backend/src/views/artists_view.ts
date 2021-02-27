import Artist from '../models/Artist';

export default {
    render(artist: Artist) {
        return {
            artistId: artist.id,
            artistName: artist.user.userName,
            artistCountry: artist.user.country,
            artistGenres: artist.generos
        };
    },
    renderMany(artists: Artist[]) {
        return artists.map(artist => this.render(artist));
    }
}