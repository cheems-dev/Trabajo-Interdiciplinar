import { Router } from 'express';
import { verificaToken, verificaAdmin_Role } from '../middlewares/authentication';
import { addNewCurso } from '../controllers/silabo';

export const silabo_router : Router = Router();
silabo_router.post('/silabo-add', verificaToken, verificaAdmin_Role, addNewCurso )