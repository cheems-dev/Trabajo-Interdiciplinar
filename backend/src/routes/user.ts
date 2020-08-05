import { Router } from 'express';//para las rutas
import { checkinUser, logged, getUser } from '../controllers/user'; //para los metodos de comprbacion y del usuario
import { verificaAdmin_Role, verificaToken, verifyStudent } from '../middlewares/authentication'; //para la autenticacion

export const user_router = Router(); //
user_router.post('/checkin', checkinUser); //envia a la ruta para comprobar el usuario
user_router.post('/signin', logged); //envia la ruta si esta registrado  
user_router.get('/user', verificaToken, verifyStudent, getUser)//envia la ruta, verifica el usuario y obtiene el usuario 