import { Request, Response} from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import loginView from '../views/login_view';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
    async login(request: Request, response: Response) {
        const {
            userName,
            password
        } = request.body;

        const usersRepository = getRepository(User);

        const schema = Yup.object().shape({
            userName: Yup.string().required(),
            password: Yup.string().required(),
        })

        try {
            await schema.validate({userName, password}, {abortEarly: false});
        }
        catch (e) {
            return response.status(400).json({error: e.errors.join(', ')});
        }

        const user = await usersRepository.findOne({userName});

        if (!user){
            return response.status(401).json({"error": "Username not found"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword){
            return response.status(401).json({"error": "Password doesn't match"});
        }

        const token = jwt.sign({id: user.id}, 'olamundo', {expiresIn: '1d'});

        return response.status(200).json({"user": loginView.render(user), "token": token});
    }

}