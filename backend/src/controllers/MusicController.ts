import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Album from '../models/Album';
import Music from '../models/Music';
import musicView from '../views/music_view';

export default {
    async create(request: Request, response: Response) {
        const musicRepository = getRepository(Music);
        const albumRepository = getRepository(Album);

        const {
            idAlbum,
            musicName,
            composer,
            musicDuration,
            trackNumber
        } = request.body;

        const album = await albumRepository.findOne(idAlbum);

        const path = request.file.path;

        const musicData = {
            musicName,
            composer,
            musicDuration,
            path,
            trackNumber,
            album,
        };

        const schema = Yup.object().shape({
            musicName: Yup.string().required(),
            composer: Yup.string().required(),
            musicDuration: Yup.number().required(),
            path: Yup.string().required(),
            trackNumber: Yup.number().required(),
        });

        try {
            await schema.validate(musicData, {abortEarly: false});
        }
        catch (e) {
            return response.status(400).json({error: e.errors.join(', ')});
        }

        const music = musicRepository.create(musicData);
        await musicRepository.save(music);

        return response.status(200).json(music);
    },
    async index (request: Request, response: Response){
        const musicRepository = getRepository(Music);

        const musics = await musicRepository.find();

        return response.status(200).json(musicView.renderMany(musics));
    },
    async show (request: Request, response: Response){
        const musicRepository = getRepository(Music);
        
        const { id } = request.params;

        const music = await musicRepository.findOne(id);

        if (!music){
            return response.status(400).json({'error': 'Could not find any entity matching this ID'});
        }

        return response.status(200).json(musicView.render(music));
    },
    async delete(request: Request, response: Response) {
        const musicRepository = getRepository(Music);

        const { id } = request.params;

        await musicRepository.delete(id);

        const music = await musicRepository.findOne(id);

        if(music) {
            return response.status(400).json({'error': 'Could not delete entity matching this ID'})
        }

        return response.status(410).json({'success': 'The entity was successfully deleted'});
    }
}