import { Router } from 'express';
import { controller } from '../controllers/authController.js'
import { authMiddleware } from '../moddleware/authMiddleware.js'
 
const authRouter = new Router;

authRouter.post('/registration', controller.registration);
authRouter.post('/login', controller.login);
authRouter.get('/users', authMiddleware, controller.getUsers);
authRouter.post('/getUser', controller.getUser);
authRouter.delete('/deleteUser', controller.deleteUser);
authRouter.put('/updateUserEmail', controller.updateUserEmail);
authRouter.put('/updateUserPassword', controller.updateUserPassword);
authRouter.post('/upload', controller.makePost)

export default authRouter;