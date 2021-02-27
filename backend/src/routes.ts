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

// User
routes.post('/user', UserController.create);
routes.get('/user/:id', loginMiddleware, UserController.show);
routes.get('/users', loginMiddleware, UserController.index);
routes.put('/user/:id', loginMiddleware, UserController.update);
routes.delete('/user/:id', loginMiddleware, UserController.delete);

// Artist
routes.post('/artist', loginMiddleware, ArtistController.create);
routes.get('/artist/:id', loginMiddleware, ArtistController.show);
routes.get('/artists', loginMiddleware, ArtistController.index);
routes.put('/artist/:id', loginMiddleware, ArtistController.update);

// Album
routes.post('/album', loginMiddleware, albumCoverUpload.single('albumCover'), AlbumController.create);
routes.get('/album/:id', loginMiddleware, AlbumController.show);
routes.get('/albums', loginMiddleware, AlbumController.index);

// Music
routes.post('/music', loginMiddleware, musicUpload.single('music'), MusicController.create);
routes.get('/music/:id', loginMiddleware, MusicController.show);
routes.get('/musics', loginMiddleware, MusicController.index);

// Login
routes.post('/login', LoginController.login);

export default routes;