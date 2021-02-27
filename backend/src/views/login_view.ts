import User from '../models/User';

export default {
    render(user: User) {
        return {
            userId: user.id,
            userOwnName: user.name,
        };
    }
}