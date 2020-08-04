import { Request, Response } from 'express';
import { userModel } from '../db/mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const checkinUser = (req: Request, res: Response) => {
    let {body} = req;
    let objectUser = new userModel({
        name: body.name,
        surname: body.surname,
        phone: body.phone,
        university: body.university,
        semestre: body.semestre,
        year: body.year,
        career: body.career,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    objectUser.save((err, userDB) => {
        if(err) {
            console.log(err)
            return res.status(500).json({
                error: {
                    message: err.message
                }
            })
        }
        
        let access_token = jwt.sign(
            { user: userDB }, 'code', 
            { expiresIn: 60 * 60 * 24 * 30 }
        )
        res.status(201).json({
            data: userDB,
            access_token
        })
    })
}

export const logged = (req: Request, res: Response) => {
    let {body} = req;

    userModel.findOne(
        {email: body.email},
        (err, userDB: any) => {
            if(err) {
                return res.status(500).json({
                    error: {
                        message: err.message
                    }
                })
            }
            if(!userDB) {
                return res.status(404).json({
                    error: {
                        message: 'wrong username or password'
                    }
                })
            }
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(404).json({
                    error: {
                        message: 'wrong username or password'
                    }
                })
            }  
            let access_token = jwt.sign(
                { user: userDB }, 'code', 
                { expiresIn: 60 * 60 * 24 * 30 }
            )
            
            res.status(200).json({
                data: {
                    user: userDB,
                    access_token
                }
            })
        }
    )
}

export const getUser = (req: Request, res: Response) => {
    let {user}  = req.query;

    userModel.findById(user._id)
            .exec((err, userDB) => {
                if(err) {
                    return res.status(500).json({
                        error: {
                            message: err.message
                        }
                    })
                }
                if(!userDB) {
                    return res.status(404).json({
                        error: {
                            message: 'id incorrecto'
                        }
                    })
                }
                res.status(200).json({
                    data: userDB
                })
            })
}
