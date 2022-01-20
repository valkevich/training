import { Router } from 'express';
import { PostController, postController } from '../controllers/postController.js';
import { authMiddleware} from '../moddleware/authMiddleware.js'

const postRouter = new Router();


postRouter.post('', postController.create);
postRouter.get('', postController.getUserPosts);
postRouter.patch('/getPost', postController.getUserPost);
postRouter.post('/updatePost', postController.updatePost);
postRouter.delete('/deletePost', postController.deletePost);

export default postRouter;

