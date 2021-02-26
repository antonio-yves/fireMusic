import Artist from '../models/Artist';

export default {
    render(artist: Artist) {
        return {
            id: artist.id,
            name: artist.user.name,
            country: artist.user.country,
            generos: artist.generos
        };
    },
    renderMany(artists: Artist[]) {
        return artists.map(artist => this.render(artist));
    }
}