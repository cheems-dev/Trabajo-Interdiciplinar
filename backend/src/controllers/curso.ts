import { Request, Response } from 'express';//librerias para argumentos de solicitud y respuesta
import { cursoModel } from '../db/mongoose'; //objeto del curso que contiene la estructura del dato


export const getCursos = (req: Request, res: Response) => { //declaracion de getCursos para devolver un curso con una funcion interna para solicitud y respuesta
    let {user} : any = req.query; //declaracion de user que requiere una consulta

    cursoModel.find() //implementacion del metodo encontrar 
        .where({student: user._id}) //se le asigna al atributo "student" el id del usuario
        .populate('silabo','title pdfname pdfurl') //populate sirve para anidar la ruta silabo con title pdfname y pdfurl
        .populate('teacher','name surname email') //anida teacher con name surname y email
        .exec((err, cursos) => { //excepcion
            if(err) {//si exsite algn error 
                return res.status(500).json({ //retorna un mensaje de error con el codigo 500
                    error: {
                        message: err.message //mensaje de error
                    }
                })
            }
            if(cursos.length === 0) { //si no hay cursos
                return res.status(404).json({ //retorna error 404
                    error: {
                        message: 'no se encontraron los cursos'
                    } 
                })
            }
            res.status(200).json({ //retorna error 200
                data: cursos //devuelve los cursos
            })
        })

}

//metodo para obtener todos los cursos
export const getCursosAll = (req: Request, res: Response) => {
    cursoModel.find() 
        .populate('silabo','title pdfname pdfurl')
        .populate('teacher','name surname email')
        .exec((err, cursos) => {
            if(err) {
                return res.status(500).json({
                    error: {
                        message: err.message
                    }
                })
            }
            if(cursos.length === 0) {
                return res.status(404).json({
                    error: {
                        message: 'no se encontraron los cursos'
                    } 
                })
            }
            res.status(200).json({
                data: cursos
            })
        })
}

//metodo para registrar un curso
export const registerCurso  = (req: Request, res: Response) => {
    let { id } : any = req.params; //se declara la variable id del tipo any(cualquier tipo de dato) y se pasa la propiedad params
    let {query} = req; //se declara una consula y se le asigna la solicitud 

    let body = {student: query.user} //se declara la variable body y se asigna el usuario del estudiante

    const options = { //se crea una opcion para el metodo findByIdandUpadte que funciona como un switch
        new: true
    }   

    cursoModel.findByIdAndUpdate(id, body, options ,(err : any, cursoDB : any) => { //metodo para buscar por Id
        if(err) { //error
            return res.status(500).json({
                error: {
                    message: err.message
                }
            })
        }
        if(!cursoDB) { //si el Id no existe
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.status(200).json({ //retorna el Id
            data: cursoDB
        })
    })

}

// maestro
// export const getCursoById = (req: Request, res: Response) => {
//     let {user} : any = req.query;
//     let {id} = req.params;

//     cursoModel.findById(id)
//         .where({teacher: user._id})
//         .exec((err, cursoDB) => {
//             if(err) {
//                 return res.status(500).json({
//                     error: {
//                         message: err.message
//                     }
//                 })
//             }
//             if(!cursoDB) {
//                 return res.status(404).json({
//                     error: {
//                         message: 'id incorrecto'
//                     } 
//                 })
//             }
//             res.status(200).json({
//                 data: cursoDB
//             })
//         })


// }

export const getCursosTeacher = (req: Request, res: Response) => {//un metodo para devolver los cursosos del docente
    let {user} : any = req.query; //declaracion del hook user asignandole una consulta

    cursoModel.find()//metodo para encontrar
        .where({teacher: user._id})//se asgina el id del docente
        .populate('silabo')//especifica la ruta silabo
        .exec((err, cursos) => {
            if(err) {//si exsite un error
                return res.status(500).json({
                    error: {
                        message: err.message
                    }
                })
            }
            if(cursos.length === 0) {//si no hay cursos
                return res.status(404).json({
                    error: {
                        message: 'no se encontraron los cursos'
                    } 
                })
            }
            res.status(200).json({//devulve los cursos
                data: cursos
            })
        })

}