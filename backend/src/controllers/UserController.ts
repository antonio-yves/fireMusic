import e, {Request, Response} from 'express';
import User from '../models/User';
import Image from '../models/Image';
import { getRepository } from 'typeorm';
import { Md5 } from 'md5-typescript';
import userView from '../views/users_view';
import * as Yup from 'yup';
import users_view from '../views/users_view';

export default {
    async create(request: Request, response: Response){
        const usersRepository = getRepository(User);
        const imageRepository = getRepository(Image);

        const {
            name,
            email,
            password,
            birthDate,
            country,
            userName,
            isArtist
        } = request.body;

        try {
            const loginUser = await usersRepository.findOneOrFail({userName});
            return response.status(400).json({"error": "username is already in use"});
        } catch (error){}

        let password2 = '';

        if (password != null){
            password2 = Md5.init(password);
        }
        
        // Usuário
        const userData = {
            name,
            email,
            password: password2,
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
            isArtist: Yup.boolean().required(),
        });

        try {
            await schema.validate(userData, {abortEarly: false});
        }
        catch (e) {
            return response.status(400).json({error: e.errors.join(', ')});
        }

        

        const user = usersRepository.create(userData);
        await usersRepository.save(user).catch();

        // Foto de Perfil
        const image = request.file.path;

        const imageData = {
            path: image,
            user: user,
        }

        const imageProfile = imageRepository.create(imageData);
        await imageRepository.save(imageProfile).catch(error => console.log(error));

        return response.status(201).json(users_view.render(user));
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