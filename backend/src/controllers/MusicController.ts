import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Album from '../models/Album';
import Music from '../models/Music';

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

        const album = albumRepository.findOne(idAlbum);

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
    },
}