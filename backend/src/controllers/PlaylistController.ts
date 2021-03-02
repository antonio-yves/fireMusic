import { Request, Response } from 'express';
import { getRepository } from 'typeorm'

import * as Yup from 'yup';
import Music from '../models/Music';
import MusicsPlaylist from '../models/MusicsPlaylist';

import Playlist from '../models/Playlist';
import User from '../models/User';

export default {
    async create(request: Request, response: Response) {
        const playlistRepository = getRepository(Playlist);
        const userRepository = getRepository(User);

        const {
            playlistName,
        } = request.body;

        const date = new Date();
        const user = await userRepository.findOne(request.userId);

        const playlistData = {
            playlistName,
            playlistDescription: '',
            isPublic: true,
            creationDate: date,
            user
        }

        const schema = Yup.object().shape({
            playlistName: Yup.string().required(),
        });

        try {
            await schema.validate(playlistData, {abortEarly: false});
        }
        catch (e) {
            return response.status(400).json({error: e.errors.join(', ')});
        }

        const playlist = playlistRepository.create(playlistData);
        await playlistRepository.save(playlist);
        
        return response.status(200).json(playlist)
    },
    async addMusic (request: Request, response: Response){
        const musicsPlaylistRepository = getRepository(MusicsPlaylist);
        const musicRepository = getRepository(Music);
        const playlistRepository = getRepository(Playlist);

        const { playlistId, musicId } = request.body;

        const playlist = await playlistRepository.findOne(playlistId);
        const music = await musicRepository.findOne(musicId);

        const musicsPlaylistData = {
            playlist,
            music,
        }

        const musicPlaylist = musicsPlaylistRepository.create(musicsPlaylistData);
        await musicsPlaylistRepository.save(musicPlaylist);

        return response.status(200).json(musicPlaylist);
    }
}