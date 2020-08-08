import React, { useEffect, useState } from 'react'//hooks y react
import './css/cursosall.css'//estulos
import { AuthService } from '../../../services/Auth';//para la autenticacion


const Cursosall = () => {
    const _sAuth = new AuthService();//para la autenticacion
    const [curso, setCurso] = useState([]) //hook para un curso
    const [cursos, setCursos] = useState([])//hook para todos los cursos

    //para obtener un curso
    const getCursos = async (token) => {//
        //
        try {
            let requestOptions = {
                method: 'GET',//metodo de envio 
                //verificacion
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }
            let response = await fetch('http://localhost:3001/cursos', requestOptions);//traer los datos de un curso
            //
            if(response.status === 200) {
                let result = await response.json();
                // console.log(result);
                setCurso(result.data)//guarda el curso 
            }
        //error    
        } catch(err) {
            console.log(err);
        }
    }

    //para obtener todos los cursos
    const getCursosAll = async (token) => {
        try {
            let requestOptions = {
                method: 'GET',//metodo de envio 
                //para la verificacion
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }
            let response = await fetch('http://localhost:3001/cursos-all', requestOptions);//traer los datos de todos los cursos
            //si fue exitoss
            if(response.status === 200) {
                let result = await response.json();//espera la respuesta
                console.log(result.data);
                setCursos(result.data)//guarda todos los cursos
            }
        //si hubo algun error    
        } catch(err) {
            console.log(err);
        }
    }


    const handleRegister = async (id) => {//para registrarse en un curso
        try {
            let requestOptions = {
                method: 'PUT',//metodo de envio 
                headers: {//verificar
                    'Content-Type': 'application/json',
                    "token": _sAuth.token //token 
                }
            }
            let response = await fetch(`http://localhost:3001/register-curso/${id}`, requestOptions);//llama a la base de datos con el id para el registro
            //si fue exitosos
            if(response.status === 200) {
                let result = await response.json();//espera la respuesta
                console.log(result.data);
                window.location.reload()//actualiza
            }
        //errores    
        } catch(err) {
            console.log(err);
        }
    }

    //para inicializar 
    useEffect(() => {
        getCursos(_sAuth.token);
        
    }, [])

    useEffect(() => {
        getCursosAll();
    }, []);

    //return
    return (
        <div className="cursosall" >
            <section className="student__header">
                <h2>Cursoss</h2>
            </section>
                <table>
                    <thead>
                        <tr>
                            <td>nombre</td>
                            <td>registrate</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        //para el registro
                        cursos && (
                            cursos.map(cur => {
                                return (                                                                    
                                    <tr  key={cur._id}>
                                        <td>
                                            {cur.name}
                                        </td>
                                        <td>
                                            {
                                                cur.student.length > 0 ? (
                                                    <button  onClick={() => {
                                                    handleRegister(cur._id)
                                                    }} >Registrado</button>
                                                ) : (
                                                    <button onClick={() => {
                                                        handleRegister(cur._id)
                                                    }} >Registrarse</button>                                                
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    }
                    </tbody>
                </table>
            <section className="cursosall__container">
                {          
                //para mostrar los cursos         
                    curso.length > 0 && (
                        curso.map(cur => (
                            <div className="card-curso" key={cur._id}>
                                <div className="card-image"></div>
                                <div className="card-budy">
                                    <h3>{cur.name}</h3>
                                    <p>Profesor: {cur.teacher.name}</p>
                                    <p>correo: {cur.teacher.email}</p>
                                    <hr/>
                                    <p>silabo: <span>{cur.silabo[0].title}</span></p>
                                    <p>archivo: <a href={`${cur.silabo[0].pdfurl}`} >{cur.silabo[0].pdfname}</a></p>
                                </div>
                            </div>
                        ))
                    ) 
                }

            </section>
        </div>
    )
}

export default Cursosall
