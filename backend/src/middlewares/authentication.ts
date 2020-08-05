import {Request, Response, NextFunction} from 'express'; //para solicitud respuesta e iterar funcions
import jwt from 'jsonwebtoken';//para el token



export const verificaToken = (req: Request, res: Response , next: NextFunction ) => {//funcion para verificar el token
    let {token} : any = req.headers
    jwt.verify(token, 'code'  ,(err: any, decoded : any ) => {//verifica el token 
        if(err) {//si el token es incorrecto o hay un error inesperado
            return res.status(401).json({ //error no autorizado
                ok: false,
                err
            })
        }

        req.query.user = decoded.user//
        next();//siguiente funcion
    })
}


export const verificaAdmin_Role = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.user.role !== 'TEACHER_ROLE') {//comprobar si es docente
        return res.status(401).json({//no autorizado
            ok: false,
            message: 'El usuario no esta verificado'
        })
    }
    next();
}

export const verifyStudent = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.user.role !== 'STUDENT_ROLE' ) {//comprobar si es estudiante
        return res.status(401).json({//no autorizado
            ok: false,
            message: 'El usuario no esta verificado'
        })
    }
    next();
}