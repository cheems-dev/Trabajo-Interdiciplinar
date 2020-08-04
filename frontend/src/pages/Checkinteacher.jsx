import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthService } from '../services/Auth';

const Checkinteacher = (props) => {

    const _sAuth = new AuthService();
    const [teacher, setTeacher] = useState({name:'', surname:'', email:'', password:'', role: 'TEACHER_ROLE'})

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
            let requestOptions = {
                method: 'POST', 
                body: JSON.stringify(teacher), 
                headers: misHeaders, 
            }
            let response = await fetch('http://localhost:3001/checkin', requestOptions);
            if(response.status === 201) { 
                let result = await response.json()
                let { data, access_token } = result;
                console.log(access_token);
                _sAuth.logoutTeacher();
                _sAuth.saveTokenTeacher(access_token, data.role)
                window.location.reload();
            }
        } catch(error) {    
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        successFetch(teacher);          
    }

    return (
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
                    <p>¿ya tienes una cuenta?<Link to="/" >iniciar sesión</Link></p>
                </article>
            </form>
        </main>
    )
}

export default Checkinteacher
