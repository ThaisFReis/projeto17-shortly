import { Router } from 'express';
import { signUpControllers, signInControllers } from '../controllers/authControllers';
import { signUpMiddlewares, signInMiddlewares } from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', signUpMiddlewares, signUpControllers);
router.post('/signin', signInMiddlewares, signInControllers);

export default router;