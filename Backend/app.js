import express from 'express';
import morgan from 'morgan';
// This imports the morgan middleware, which is a logging tool that logs details about incoming HTTP requests (e.g., method, URL, status).
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
connect();


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app; 
