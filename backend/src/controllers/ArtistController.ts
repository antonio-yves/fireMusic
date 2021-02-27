import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Artist from '../models/Artist';
import User from '../models/User';
import artistView from '../views/artists_view';

export default {
    async create(request: Request, response: Response){
        const userRepository = getRepository(User);
        const artistRepository = getRepository(Artist);
        const user = await userRepository.findOne(request.userId);

        if (user?.isArtist != true) {
            return response.status(400).json({"error": "Your profile is not allowed to this"});
        }

        const hasArtist = await artistRepository.findOne({user});

        if (hasArtist) {
            return response.status(400).json({"error": "Your account already has an artist profile"})
        }

        const artistData = {
            generos: request.body.generos,
            user
        }

        const artist = artistRepository.create(artistData);
        await artistRepository.save(artist).catch();
        
        return response.status(200).json(artistView.render(artist));
    },
    async index (request: Request, response: Response){
        const artistRepository = getRepository(Artist);

        const artists = await artistRepository.find();

        return response.status(200).json(artistView.renderMany(artists));
    },
    async show (request: Request, response: Response){
        const artistRepository = getRepository(Artist);

        const { id } = request.params;

        const artist = await artistRepository.findOne(id);

        if (!artist){
            return response.status(400).json({'error': 'Could not find any entity matching this ID'});
        }

        return response.status(200).json(artistView.render(artist));
    },
    async update (request: Request, response: Response){
        const artistRepository = getRepository(Artist);

        const { id } = request.params;
        const { newGeneros } = request.body;

        await artistRepository.save({
            id,
            generos: newGeneros
        });

        const artist = await artistRepository.findOne(id);

        if (!artist){
            return response.status(400).json({'error': 'Could not find any entity matching this ID'});
        }

        return response.status(200).json(artistView.render(artist));
    }
}