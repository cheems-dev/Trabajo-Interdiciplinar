import { Router } from 'express';//para las rutas
import { verificaToken, verificaAdmin_Role } from '../middlewares/authentication'; //autenticacion
import { addNewCurso } from '../controllers/silabo';//para añadir un nuevo silabo de un curso

export const silabo_router : Router = Router(); //exporta la ruta del silabo
silabo_router.post('/silabo-add', verificaToken, verificaAdmin_Role, addNewCurso ) //envia la ruta, la verificacion y el metodo para añadir el silabo del curso