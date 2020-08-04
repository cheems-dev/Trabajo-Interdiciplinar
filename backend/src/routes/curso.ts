import { Router } from 'express';
import { getCursos, registerCurso, getCursosAll, getCursosTeacher } from '../controllers/curso';
import { verificaToken, verifyStudent, verificaAdmin_Role } from '../middlewares/authentication';

export const curso_router : Router = Router();
curso_router.get('/cursos', verificaToken, verifyStudent, getCursos);
curso_router.put('/register-curso/:id', verificaToken, verifyStudent, registerCurso);
curso_router.get('/cursos-all', getCursosAll);
// curso_router.get('/curso/:id', getCursoById);
curso_router.get('/cursos-teacher-all', verificaToken, verificaAdmin_Role, getCursosTeacher)