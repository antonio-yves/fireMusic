import {Request, Response} from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import userView from '../views/users_view';
import * as Yup from 'yup';

export default {
    async create(request: Request, response: Response){
        const usersRepository = getRepository(User);

        const {
            name,
            email,
            password,
            birthDate,
            country,
            userName,
            isArtist
        } = request.body;

        const loginUser = await usersRepository.findOne({userName});

        if (loginUser){
            return response.status(409).json({"error": "username is already in use"});
        }
        
        // Usuário
        const userData = {
            name,
            email,
            password,
            birthDate,
            country,
            userName,
            isArtist: isArtist === 'true',
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
            birthDate: Yup.date().required(),
            country: Yup.string().required(),
            userName: Yup.string().required(),
        });

        try {
            await schema.validate(userData, {abortEarly: false});
        }
        catch (e) {
            return response.status(400).json({error: e.errors.join(', ')});
        }

        const user = usersRepository.create(userData);
        await usersRepository.save(user).catch();

        return response.status(201).json(userView.render(user));
    },
    async index(request: Request, response: Response){
        const usersRepository = getRepository(User);

        const users = await usersRepository.find();

        return response.status(200).json(userView.renderMany(users));
    },
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getRepository(User);

        try {
            const user = await usersRepository.findOneOrFail(id);
            return response.status(200).json(userView.render(user));
        } catch (e) {
            return response.status(400).json({"error": e.message});
        }
        
    }
}