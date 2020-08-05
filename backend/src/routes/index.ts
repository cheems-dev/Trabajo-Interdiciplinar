import express from 'express';//para iniciar el servidor
import { user_router } from './user'; //rutas del usuario
import { silabo_router } from './silabo'; //rutas del silabo
import { curso_router } from './curso'; //rutas del curso

export const Routes: express.Application = express(); //exporta las rutas e inicia la aplicacion
Routes.use('', user_router); //asigna la ruta del usuario
Routes.use('', silabo_router); //asigna la ruta del silabo
Routes.use('', curso_router); //asigna la ruta del curso