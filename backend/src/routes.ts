import { Router } from 'express';
import multer from 'multer';

import profilePictureUploadConfig from './config/profilePictureUpload';
import UserController from './controllers/UserController';
import LoginController from './controllers/LoginController';
import User from './models/User';

const routes = Router();
const profilePictureUpload = multer(profilePictureUploadConfig);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', profilePictureUpload.single('image'), UserController.create);
routes.post('/login', LoginController.login);

export default routes;