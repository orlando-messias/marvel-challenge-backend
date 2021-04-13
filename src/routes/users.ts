import { Router } from 'express';
import UserController from '../controller/UserController';
import { auth } from '../middlewares/auth';

const usersRoute = Router();
const userController = new UserController();

usersRoute.post('/login', userController.login);
usersRoute.post('/save', userController.saveUser);
usersRoute.get('/:id', auth, userController.getUserById);
usersRoute.put('/:id', auth, userController.updateUser);

export default usersRoute;