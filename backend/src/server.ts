import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import './database/connection';
import 'express-async-errors';

import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3333, () => {
    console.log("Server started on port 3333!");
});