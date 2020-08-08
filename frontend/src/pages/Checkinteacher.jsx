import React, { useState } from 'react'//react
import { Link } from 'react-router-dom'//link
import { AuthService } from '../services/Auth';//autenticacion

const Checkinteacher = (props) => {

    const _sAuth = new AuthService(); //para la autenticacion
    //se inicializa con rol de docente
    const [teacher, setTeacher] = useState({name:'', surname:'', email:'', password:'', role: 'TEACHER_ROLE'})

    //para actulizar los campos
    const handleUpdate = (e) => {
        setTeacher({
            ...teacher,
            [e.target.name]: e.target.value
        })
    }


    const successFetch = async (teacher) => {
        try {
            let misHeaders = new Headers();
            misHeaders.append('Content-Type','application/json')
            //para el request 
            let requestOptions = {
                method: 'POST', 
                body: JSON.stringify(teacher), //para encadenar
                headers: misHeaders, 
            }

            let response = await fetch('http://localhost:3001/checkin', requestOptions); //llama a comprobar o registro
            if(response.status === 201) { 
                let result = await response.json()//espera la respuesta
                let { data, access_token } = result; //se carga los datos y el token
                console.log(access_token);
                _sAuth.logoutTeacher();//cerrar sesion
                _sAuth.saveTokenTeacher(access_token, data.role)//guardar el token
                window.location.reload(); //actulizar
            }
        //error    
        } catch(error) {    
            console.log(error);
        }
    }

    //para el registro
    const handleSubmit = (e) => {
        e.preventDefault();
        successFetch(teacher);          
    }

    return (
        //interfaz para registrarse
        <main className='homeview' >
            <form onSubmit={handleSubmit} >
                <h2>Registro</h2>
                <section className="form-group">
                    <input type="text"
                        name='name'
                        placeholder='nombre'
                        className='input'
                        onChange={handleUpdate}
                    />
                    <input type="text"
                        name='surname'
                        placeholder="apellido"
                        className='input'
                        onChange={handleUpdate}
                    />
                    <input type="email"
                        name='email'
                        placeholder='correo electronico'
                        className='input'
                        onChange={handleUpdate}
                    />                    
                    <input type="password"
                        name='password'
                        placeholder="password"
                        className='input'
                        onChange={handleUpdate}
                    />
                    <button type='submit' className='btn-submit' >Registrarse</button>
                </section>            
                <article className='help' >
                    {/* Si ya tiene cuenta */}
                    <p>¿ya tienes una cuenta?<Link to="/" >iniciar sesión</Link></p>
                </article>
            </form>
        </main>
    )
}

export default Checkinteacher
