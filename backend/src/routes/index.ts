import express from 'express';
import { user_router } from './user';
import { silabo_router } from './silabo';
import { curso_router } from './curso';

export const Routes: express.Application = express();
Routes.use('', user_router);
Routes.use('', silabo_router);
Routes.use('', curso_router);