import { Request, Response } from 'express';    //para la solicitud y respuesta
import { userModel } from '../db/mongoose'; //para el esquema del usuario
import bcrypt from 'bcrypt';    //para guardar las contraseñas
import jwt from 'jsonwebtoken'; //para la autenticacion y los tokens

export const checkinUser = (req: Request, res: Response) => {//funcion para comprobar el usuario
    let {body} = req; //se trae la data del usuario
    let objectUser = new userModel({    //objectuser alamacena los datos del usuario
        name: body.name,
        surname: body.surname,
        phone: body.phone,
        university: body.university,
        semestre: body.semestre,
        year: body.year,
        career: body.career,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),//almacena los 10 primeros caracteres de la contraseña
        role: body.role
    })

    //guarda los datos del usuario
    objectUser.save((err, userDB) => {
        if(err) { //si existe un error
             console.log(err) //muestra el error en consola
            //retorna el error 
            return res.status(500).json({ 
                error: {
                    message: err.message
                }
            })
        }
        

        let access_token = jwt.sign(//para acceder al token
            { user: userDB }, 'code',//asigna al usuario el token 
            { expiresIn: 60 * 60 * 24 * 30 }//tiempo para que el token expire 
        )
        res.status(201).json({//la solicitud para crear al usuario tuvo exito
            data: userDB, //obtiene los datos del usuario
            access_token //para dar a ese usuario un token
        })
    })
}

export const logged = (req: Request, res: Response) => {//para acceder
    let {body} = req;//trae la data

    userModel.findOne(//para buscar al uruario
        {email: body.email},//asignacion a email desde los datos
        (err, userDB: any) => {
            if(err) {//si existe algun error inesperado
                return res.status(500).json({
                    error: {
                        message: err.message
                    }
                })
            }
            if(!userDB) {//si el usuario no existe
                return res.status(404).json({
                    error: {
                        message: 'wrong username or password'
                    }
                })
            }
            if (!bcrypt.compareSync(body.password, userDB.password)) {//compara si la contraseña ingresada es correcta
                return res.status(404).json({//
                    error: {
                        message: 'wrong username or password'
                    }
                })
            } 
            
            //para asignarle un token
            let access_token = jwt.sign(
                { user: userDB }, 'code', 
                { expiresIn: 60 * 60 * 24 * 30 }
            )
            
            //si se ha verificado con exito accede a los datos
            res.status(200).json({
                data: {
                    user: userDB,
                    access_token
                }
            })
        }
    )
}

export const getUser = (req: Request, res: Response) => {//funcion para obtener al usuario
    let {user}  = req.query;//consulta

    userModel.findById(user._id)//buscar por el id
            .exec((err, userDB) => {
                if(err) {
                    return res.status(500).json({//error del servidor
                        error: {
                            message: err.message
                        }
                    })
                }
                if(!userDB) {//si el id es incorrecto o no existe
                    return res.status(404).json({
                        error: {
                            message: 'id incorrecto'
                        }
                    })
                }
                res.status(200).json({//se tuvo exito al encontrar el usuario
                    data: userDB
                })
            })
}
