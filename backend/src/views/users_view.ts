import User from '../models/User';

export default {
    render(user: User) {
        return {
            userId: user.id,
            userOwnName: user.name,
            userEmail: user.email,
            userBirthDate: user.birthDate,
            userCountry: user.country,
            userName: user.userName,
            isArtist: user.isArtist,
        };
    },
    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}