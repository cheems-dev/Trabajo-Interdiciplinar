import React, { useEffect, useState } from 'react'
import './css/cursosall.css'
import { AuthService } from '../../../services/Auth';
const Cursosall = () => {
    const _sAuth = new AuthService();
    const [curso, setCurso] = useState([])
    const [cursos, setCursos] = useState([])
    const getCursos = async (token) => {
        try {
            let requestOptions = {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }
            let response = await fetch('http://localhost:3001/cursos', requestOptions);
            if(response.status === 200) {
                let result = await response.json();
                // console.log(result);
                setCurso(result.data)
            }
        } catch(err) {
            console.log(err);
        }
    }
    const getCursosAll = async (token) => {
        try {
            let requestOptions = {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }
            let response = await fetch('http://localhost:3001/cursos-all', requestOptions);
            if(response.status === 200) {
                let result = await response.json();
                console.log(result.data);
                setCursos(result.data)
            }
        } catch(err) {
            console.log(err);
        }
    }


    const handleRegister = async (id) => {
        try {
            let requestOptions = {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    "token": _sAuth.token
                }
            }
            let response = await fetch(`http://localhost:3001/register-curso/${id}`, requestOptions);
            if(response.status === 200) {
                let result = await response.json();
                console.log(result.data);
                window.location.reload()
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCursos(_sAuth.token);
        
    }, [])

    useEffect(() => {
        getCursosAll();
    }, []);

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
