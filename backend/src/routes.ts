import { Router } from 'express';
import multer from 'multer';

// Middlewares
import loginMiddleware from './middlewares/loginMiddleware';

// Multer Configs
import profilePictureUploadConfig from './config/profilePictureUpload';
import albumCoverUploadConfig from './config/albumCoverUpload';
import musicUploadConfig from './config/musicUpload';

// Controllers
import UserController from './controllers/UserController';
import LoginController from './controllers/LoginController';
import ArtistController from './controllers/ArtistController';

const routes = Router();
const profilePictureUpload = multer(profilePictureUploadConfig);

routes.get('/users', loginMiddleware, UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.post('/login', LoginController.login);
routes.post('/artist', loginMiddleware, ArtistController.create);

export default routes;