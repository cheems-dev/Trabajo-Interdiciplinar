import React, {useState} from 'react' //react
import './checkinstudent.css'; //estilos 
import { Link } from 'react-router-dom'; //rutas 
import { AuthService } from '../services/Auth'; //autenticacion

//comprobar estudiante
const Chekinstudent = () => {
    const _sAuth = new AuthService(); //para la autenticacion

    //estructura del usuario
    const [user, setUser] = useState({
        name: '',
        surname:'',
        phone: 0,
        email: '',
        semestre: '',
        password: '',
        year: '',
        career: ''
    })

    //para actualizar los campos
    const handleUpdate = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const successFetch = async (student) => {
        try {
            let misHeaders = new Headers();
            misHeaders.append('Content-Type','application/json') 
            //opciones del request
            let requestOptions = {
                method: 'POST', 
                body: JSON.stringify(student), 
                headers: misHeaders, 
            }
            let response = await fetch('http://localhost:3001/checkin', requestOptions); //llama a comprobar o regristro
            if(response.status === 201) { //si tuvo exito
                let result = await response.json() //espera a que se cargue los datos
                let { data, access_token } = result; //datos y token
                _sAuth.logout();//cerrar sesion
                _sAuth.saveToken(access_token, data.role); //guardar token                
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
        successFetch(user);            
    }

    return (
        //formualrio de registro de un estudiante
        <div className="checkinstudent" >
            <div className="checkin_form">
                <form 
                    onSubmit={handleSubmit}>
                    {/* Nombre y Apellido */}
                    <div className="form-control" >
                        <input type="text"
                            name='name'
                            placeholder='nombre'
                            className='input' 
                            onChange={handleUpdate}
                        />
                        <input type="text"
                            name='surname'
                            placeholder='apellido'
                            className='input' 
                            onChange={handleUpdate}
                        />
                    </div>

                    {/* Correo y telefono */}
                    <div className="form-control" >
                        <input type="email"
                            name='email'
                            placeholder='correo electronico'
                            className='input' 
                            onChange={handleUpdate}
                        />
                        <input type="number"
                            name='phone'
                            placeholder='celular'
                            className='input' 
                            onChange={handleUpdate}
                        />
                    </div>

                    {/* Contraseña y semestre */}
                    <div className="form-control" >
                        <input type="password"
                            name='password'
                            placeholder='password'
                            className='input' 
                            onChange={handleUpdate}
                        />
                        <input type="text"
                            name='semestre'
                            placeholder='semestre'
                            className='input' 
                            onChange={handleUpdate}
                        />
                    </div>

                    {/* Año y Carrera */}
                    <div className="form-control" >
                        <input type="text"
                            name='year'
                            placeholder='año academico'
                            className='input' 
                            onChange={handleUpdate}
                        />
                        <input type="text"
                            name='career'
                            placeholder='carrera profesional'
                            className='input' 
                            onChange={handleUpdate}
                        />
                    </div>
                        <button type='submit' className="btn-submit btn-register" >Registrarse</button>
                        <article className='help' >
                            {/* Para crear cuenta de estudiante */}
                            <p>¿ya tienes una cuenta?<Link to="/" >iniciar sesión</Link></p>
                        </article>
                </form>
            </div>
            <div className="checkin_image"></div>
        </div>
    )
}

export default Chekinstudent
