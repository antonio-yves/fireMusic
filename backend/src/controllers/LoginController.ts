import { Request, Response} from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import { Md5 } from 'md5-typescript';
import * as Yup from 'yup';
import loginView from '../views/login_view';

export default {

    async login(request: Request, response: Response) {
        const {
            userName,
            password
        } = request.body;

        const usersRepository = getRepository(User);

        let password2 = '';

        if (password != null){
            password2 = Md5.init(password);
        }

        const loginData = {
            userName,
            password
        }

        const schema = Yup.object().shape({
            userName: Yup.string().required(),
            password: Yup.string().required(),
        })

        try {
            await schema.validate(loginData, {abortEarly: false});
        }
        catch (e) {
            return response.status(400).json({error: e.errors.join(', ')});
        }

        const user = await usersRepository.findOneOrFail({userName});

        if (user.password == password2){
            return response.status(200).json(loginView.render(user));
        } else {
            return response.status(400).json({"error": "password doesn't match"});
        }

    }

}