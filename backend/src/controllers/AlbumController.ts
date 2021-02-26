import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Album from '../models/Album';
import AlbumCover from '../models/AlbumCover';
import Artist from '../models/Artist';
import User from '../models/User';
import albumView from '../views/album_view';
import albumCoverView from '../views/albumCover_view';

export default {

    async create(request: Request, response: Response) {
        const albumRepository = getRepository(Album);
        const albumCoverRepository = getRepository(AlbumCover);
        const artistRepository = getRepository(Artist);
        const userRepository = getRepository(User);

        const {
            nome,
            copyright,
            generos,
            isComplete,
            isSingle,
            gravadora,
            lancamento,
            trackNumber
        } = request.body;

        const user = await userRepository.findOne(request.userId);
        const artist = await artistRepository.findOne({user});

        const albumCover = request.file.path;

        if (!albumCover){
            return response.status(400).json({"error": "Album cover is required"})
        }

        const albumData = {
            nome,
            copyright,
            generos,
            isComplete: isComplete === 'true',
            isSingle: isSingle === 'true',
            gravadora,
            lancamento,
            trackNumber,
            artist,
        }

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            copyright: Yup.string().required(),
            generos: Yup.string().required(),
            isComplete: Yup.boolean().required(),
            isSingle: Yup.boolean().required(),
            gravadora: Yup.string().required(),
            lancamento: Yup.date().required(),
            trackNumber: Yup.number().required(),
        });

        try {
            await schema.validate(albumData, {abortEarly: false});
        }
        catch (e) {
            return response.status(400).json({error: e.errors.join(', ')});
        }

        const album = albumRepository.create(albumData);
        await albumRepository.save(album).catch();

        const coverData = {
            path: albumCover,
            album
        };

        const cover = albumCoverRepository.create(coverData);

        await albumCoverRepository.save(cover).catch();

        return response.status(200).json({"album": albumView.render(album), "cover": albumCoverView.render(cover)});
    },
    async show (request: Request, response: Response){
        const { id } = request.params;

        const albumRepository = getRepository(Album);

        const album = await albumRepository.findOneOrFail(id, {
            relations: ['musics']
        });
        
        return response.status(200).json(album);
    }

}