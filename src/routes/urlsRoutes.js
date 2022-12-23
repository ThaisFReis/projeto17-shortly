import { Router } from 'express';
import { shortenUrlControllers, getOpenUrlControllers, getUrlByIdControllers, deleteUrlControllers } from '../controllers/urlsControllers.js';
import { token } from '../middlewares/token.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', shortenUrlControllers,  token);
urlsRouter.get('/urls/:id', getUrlByIdControllers);
urlsRouter.get('/urls/open/:shortUrl', getOpenUrlControllers);
urlsRouter.delete('/urls/:id', deleteUrlControllers, token);

export default urlsRouter;