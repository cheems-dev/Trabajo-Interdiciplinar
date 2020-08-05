import { Router } from 'express';//para las rutas
import { getCursos, registerCurso, getCursosAll, getCursosTeacher } from '../controllers/curso';//metodos para asignarse en als rutas
import { verificaToken, verifyStudent, verificaAdmin_Role } from '../middlewares/authentication';//intemediarios entre la peticion y la respuesta

export const curso_router : Router = Router();//rutas de los cursos
curso_router.get('/cursos', verificaToken, verifyStudent, getCursos); //la ruta cursos incluye el login del estudiante y le muestra sus cursos  
curso_router.put('/register-curso/:id', verificaToken, verifyStudent, registerCurso); //esta ruta para que el estudiante se regristre en un curso
curso_router.get('/cursos-all', getCursosAll); //para mostrar todos los cursos
// curso_router.get('/curso/:id', getCursoById);
curso_router.get('/cursos-teacher-all', verificaToken, verificaAdmin_Role, getCursosTeacher) //para los docentes