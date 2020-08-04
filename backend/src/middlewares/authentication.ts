import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';



export const verificaToken = (req: Request, res: Response , next: NextFunction ) => {
    let {token} : any = req.headers
    jwt.verify(token, 'code'  ,(err: any, decoded : any ) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.query.user = decoded.user
        next();
    })
}


export const verificaAdmin_Role = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.user.role !== 'TEACHER_ROLE') {
        return res.status(401).json({
            ok: false,
            message: 'El usuario no esta verificado'
        })
    }
    next();
}

export const verifyStudent = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.user.role !== 'STUDENT_ROLE' ) {
        return res.status(401).json({
            ok: false,
            message: 'El usuario no esta verificado'
        })
    }
    next();
}