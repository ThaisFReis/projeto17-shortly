import express,{ json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import routes
import authRoutes from './routes/authRoutes.js';
import urlsRouter from './routes/urlsRoutes.js';
import usersRouter from './routes/usersRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// use routes
app.use(authRoutes);
app.use(urlsRouter);
app.use(usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});