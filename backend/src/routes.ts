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
import AlbumController from './controllers/AlbumController';
import MusicController from './controllers/MusicController';

const routes = Router();
const profilePictureUpload = multer(profilePictureUploadConfig);
const albumCoverUpload = multer(albumCoverUploadConfig);
const musicUpload = multer(musicUploadConfig);

routes.get('/users', loginMiddleware, UserController.index);
routes.get('/users/:id', loginMiddleware, UserController.show);
routes.post('/users', UserController.create);
routes.post('/login', LoginController.login);
routes.post('/artist', loginMiddleware, ArtistController.create);
routes.post('/album', loginMiddleware, albumCoverUpload.single('albumCover'), AlbumController.create);
routes.post('/music', loginMiddleware, musicUpload.single('music'), MusicController.create);

export default routes;