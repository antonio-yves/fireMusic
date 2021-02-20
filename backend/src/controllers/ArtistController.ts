import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Artist from '../models/Artist';
import User from '../models/User';
import userView from '../views/users_view';

export default {
    async create(request: Request, response: Response){
        const userRepository = getRepository(User);
        const artistRepository = getRepository(Artist);
        const user = await userRepository.findOne(request.userId);

        if (user?.isArtist != true) {
            return response.status(400).json({"error": "Your profile is not allowed to this"});
        }

        const artistData = {
            generos: request.body.generos,
            user
        }

        const artist = artistRepository.create(artistData);
        await artistRepository.save(artist).catch();
        
        return response.status(200).json({"user": userView.render(user), "artist": artist});
    }
}