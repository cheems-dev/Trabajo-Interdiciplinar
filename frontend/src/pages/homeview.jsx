import React, { useState } from 'react' //react
import './homeview.css' //home
import { Link } from 'react-router-dom' //links
import { AuthService } from '../services/Auth'; //autenticacion

//home
const HomeView = () => {
    const _sAuth = new AuthService(); //para la autenticacion

    const [user, setUser] = useState({email:'', password:''}) //usuario y contraseña

    //para actualizar los campos
    const handleUpdate = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const successFetch = async (user) => {
        try {
            //opciones del request
            let requestOptions = {
                method: 'POST', 
                body: JSON.stringify(user), 
                headers:{
                  'Content-Type': 'application/json'
                }
            }
            let response = await fetch('http://localhost:3001/signin', requestOptions) //llama a iniciar sesion
            console.log(response,'sigin')
            if(response.status === 200) {//si tuvo exito en la invocacion
                let result = await response.json(); //espera a que se carguen los datos
                let { user, access_token } = result.data //carga el usuario y el token

            //Verifica el rol del usuario
                //si es docente
                if(user.role === "TEACHER_ROLE") {
                    _sAuth.logout();
                    _sAuth.saveTokenTeacher(access_token, user.role);
                    window.location.reload(); 
                }
                //si es estudiante
                if(user.role === "STUDENT_ROLE") {
                    _sAuth.logoutTeacher();
                    _sAuth.saveToken(access_token, user.role);
                    window.location.reload(); 
                }
            }
        //error
        } catch(error) {    
            console.log(error);
        }
    }

    //para el inicio de sesion
    const handleSubmit = (e) => {
        e.preventDefault();
        successFetch(user);            
    }

    return (
        <main className='homeview' >
            <form onSubmit={handleSubmit} >
                <h2>Inicio de Sesión</h2>
                <section className="form-group">
                    {/*Correo electronico */}
                    <input type="email"
                        name='email'
                        placeholder='correo electronico'
                        className='input'
                        onChange={handleUpdate}
                    />
                    {/*Contraseña */}
                    <input type="password"
                        name='password'
                        placeholder="password"
                        className='input'
                        onChange={handleUpdate}
                    />
                    <button type='submit' className='btn-submit' >Iniciar Sesión</button>
                </section>            
                <article className='help' >
                    {/*Para registrarse */}
                    <p>Registrate como <Link to="/checkin-student" >Estudiante</Link></p>
                    <p>Registrate como <Link to="/checkin-teacher" >Profesor</Link></p>
                </article>
            </form>
        </main>
    )
}

export default HomeView
