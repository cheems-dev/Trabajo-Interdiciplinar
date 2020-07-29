import React, { useState } from 'react'
import './homeview.css'
import { Link } from 'react-router-dom'
import { AuthService } from '../services/Auth';

const HomeView = () => {
    const _sAuth = new AuthService();

    const [user, setUser] = useState({email:'', password:''})

    const handleUpdate = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const successFetch = async (user) => {
        try {
            let requestOptions = {
                method: 'POST', 
                body: JSON.stringify(user), 
                headers:{
                  'Content-Type': 'application/json'
                }
            }
            let response = await fetch('http://localhost:3001/signin', requestOptions)
            console.log(response,'sigin')
            if(response.status === 200) {
                let result = await response.json();
                let { user, access_token } = result.data
                if(user.role === "TEACHER_ROLE") {
                    _sAuth.logout();
                    _sAuth.saveTokenTeacher(access_token, user.role);
                    window.location.reload(); 
                }
                if(user.role === "STUDENT_ROLE") {
                    _sAuth.logoutTeacher();
                    _sAuth.saveToken(access_token, user.role);
                    window.location.reload(); 
                }
            }
        } catch(error) {    
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        successFetch(user);            
    }

    return (
        <main className='homeview' >
            <form onSubmit={handleSubmit} >
                <h2>Inicio de Sesión</h2>
                <section className="form-group">
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
                    <button type='submit' className='btn-submit' >Iniciar Sesión</button>
                </section>            
                <article className='help' >
                    <p>Registrate como <Link to="/checkin-student" >Estudiante</Link></p>
                    <p>Registrate como <Link to="/checkin-teacher" >Profesor</Link></p>
                </article>
            </form>
        </main>
    )
}

export default HomeView
