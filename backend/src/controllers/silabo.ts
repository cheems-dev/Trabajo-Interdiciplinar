import { Request, Response } from 'express';//librerias para argumentos de solicitud y respuesta
import { startSession } from 'mongoose'; //para inciar sesion en la conexion
import { cursoModel, silaboModel } from '../db/mongoose'; //para el esquema del curso

interface iSilabo{ //creacion de la interfaz iSilabo
    title: String, 
    year: String,
    semestre: String,
    pdfname: String,
    pdfurl: String
}

const silaboPdfCurso = async (objectSilabo: iSilabo, objectCurso: object, user: any) => {//se declara una funcion asincrona con 3 parametros

    const session = await startSession();//se espera hasta que se inicia sesion
    session.startTransaction();//se inicia la transaccion importante para ejecutar operaciones de forma aislada como cancelar
    try {
        const opts = { session }; //asigna la sesion

        //se crean las colecciones
        await silaboModel.createCollection();
        await cursoModel.createCollection();

        //esquema para guardar el silabo
        let objectSilabos = new silaboModel({
            title: objectSilabo.title,
            year: objectSilabo.year,
            semestre: objectSilabo.semestre,
            pdfname: objectSilabo.pdfname,
            pdfurl: objectSilabo.pdfurl,
            user
        })

        //guarda el esquema del silabo en la sesion
        let silabo = await objectSilabos.save(opts);

        //esquema para guardar el curso
        let objectCursos = new cursoModel({
            name: objectCurso.name,
            teacher: user,
            silabo: silabo._id
        });
        
        //guarda el esquema del curso en la sesion
        let curso = await objectCursos.save(opts);
  
        //realiza la transaccion
        await session.commitTransaction();
        session.endSession();//termina la sesion
    
        return curso

    } catch( err ) { //si existe algun error
        await session.abortTransaction();//termina la transaccion
        session.endSession(); //termina la sesion
        throw err //obtener el error        
    }   
}


export const addNewCurso = (req: Request, res: Response) => {//funcion para añadir un nuevo curso
    let {body, query} : any= req;//asignacion de una variable general a body y query

    silaboPdfCurso(body.objectSilabo, body.objectCurso, query.user._id)//se pasa como argumento el silabo, el curso y el id
    .then((response) => {
        res.status(201).json({//Devuelve el estado 201 que significa que ha sido creado con exito
            data: response//se asigna a data la respuesta
        })
    })
    .catch(err => { //si ocurre algun error
        res.status(400).json({ //Indica que hubo un error en la peticion
            error: {
                message: err.message//muestra el error
            }
        })   
    })

}






