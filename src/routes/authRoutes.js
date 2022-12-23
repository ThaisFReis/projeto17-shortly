import { Router } from 'express';
import { signUpControllers, signInControllers } from '../controllers/authControllers.js';
import { signUpMiddlewares, signInMiddlewares } from '../middlewares/authMiddlewares.js';

const authRouter = Router();

authRouter.post('/signup', signUpMiddlewares, signUpControllers);
authRouter.post('/signin', signInMiddlewares, signInControllers);

export default authRouter;