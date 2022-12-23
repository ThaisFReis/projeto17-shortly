import { Router } from "express";
import { token } from '../middlewares/token.js';
import { getUserByIdControllers, getRanking } from "../controllers/userController.js";

const usersRouter = Router();

usersRouter.get('/users/me', token, getUserByIdControllers);
usersRouter.get('/ranking', getRanking);

export default usersRouter;