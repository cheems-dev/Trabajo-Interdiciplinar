import { Request, Response } from 'express';
import { cursoModel } from '../db/mongoose';


export const getCursos = (req: Request, res: Response) => {
    let {user} : any = req.query;

    cursoModel.find()
        .where({student: user._id})
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

export const registerCurso  = (req: Request, res: Response) => {
    let { id } : any = req.params;
    let {query} = req;

    let body = {student: query.user}

    const options = {
        new: true
    }   

    cursoModel.findByIdAndUpdate(id, body, options ,(err : any, cursoDB : any) => {
        if(err) {
            return res.status(500).json({
                error: {
                    message: err.message
                }
            })
        }
        if(!cursoDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.status(200).json({
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

export const getCursosTeacher = (req: Request, res: Response) => {
    let {user} : any = req.query;

    cursoModel.find()
        .where({teacher: user._id})
        .populate('silabo')
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