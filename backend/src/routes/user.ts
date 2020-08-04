import { Router } from 'express';
import { checkinUser, logged, getUser } from '../controllers/user';
import { verificaAdmin_Role, verificaToken, verifyStudent } from '../middlewares/authentication';

export const user_router = Router();
user_router.post('/checkin', checkinUser);
user_router.post('/signin', logged);
user_router.get('/user', verificaToken, verifyStudent, getUser)