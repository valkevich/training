import { Router } from 'express';
import { postController } from '../controllers/postController.js';
import { authMiddleware} from '../moddleware/authMiddleware.js'

const postRouter = new Router();


postRouter.post('', postController.create)
postRouter.get('', postController.getUserPosts)


export default postRouter;

