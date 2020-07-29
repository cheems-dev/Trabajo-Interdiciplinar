import React, {useState} from 'react'
import './checkinstudent.css';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/Auth';
const Chekinstudent = () => {
    const _sAuth = new AuthService();

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
            let requestOptions = {
                method: 'POST', 
                body: JSON.stringify(student), 
                headers: misHeaders, 
            }
            let response = await fetch('http://localhost:3001/checkin', requestOptions);
            if(response.status === 201) { 
                let result = await response.json()
                let { data, access_token } = result;
                _sAuth.logout();
                _sAuth.saveToken(access_token, data.role);                
                window.location.reload();
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
        <div className="checkinstudent" >
            <div className="checkin_form">
                <form 
                    onSubmit={handleSubmit}>
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
                            <p>¿ya tienes una cuenta?<Link to="/" >iniciar sesión</Link></p>
                        </article>
                </form>
            </div>
            <div className="checkin_image"></div>
        </div>
    )
}

export default Chekinstudent
