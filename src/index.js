import express,{ json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import routes

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// use routes

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
