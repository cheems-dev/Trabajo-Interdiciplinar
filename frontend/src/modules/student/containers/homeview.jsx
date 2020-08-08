import React, { useState, useEffect } from 'react' //react
import './css/homeview.css' //estilos
import { AuthService } from '../../../services/Auth'; //autenticacion

//ver home
const Homeview = (props) => {
    const _sAuth = new AuthService(); //para la autenticacion

    const [data, setData] = useState() //para los datos

    //obtener el usuario
    const getUser = async (token) => {
        //autenticacon y metodo de envio
        try {
            let requestOptions = {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }

            let response = await fetch('http://localhost:3001/user', requestOptions)//esperar a que se cargue el usuario
            //si tuvo exito
            if(response.status === 200) {
                let result = await response.json();
                console.log(result);
                setData(result.data)//se trae los datos del usuario
            }
        
        //si existe algun error    
        }catch(err) {
            console.log(err);
        }
    }

    //inicializar
    useEffect(() => {
        getUser(_sAuth.token)
    }, [])

    return (
        //para ver el home
        <form className="homeview__student" >
            {/* Para ver los datos del estudiante */ }
            <section className="student__header">
                <h2>Perfil</h2>
            </section>
            {
                data ? (
                    <>
                        <section className="student_body">
                        <div className="student__datos">
                            Datos Personal
                        </div>
                    
                        <section className="form-group student__form">
                            {/* Nombre y Apellido */ }
                            <div className="form-column" >
                                <label htmlFor="" className="label__student" >Nombre</label>
                                <input type="text"
                                    name='name'
                                    placeholder='Nombre'
                                    className='input student_input'
                                    value={data.name}
                                    // onChange={handleUpdate}
                                />
                                <label htmlFor="" className="label__student" >Apellido</label>
                                <input type="text"
                                    name='surname'
                                    placeholder="Apellido"
                                    className='input student_input'
                                    value={data.surname}
                                    // onChange={handleUpdate}
                                />
                            </div>

                            {/* Email y Telefono */ }
                            <div className="form-column" >
                                <label htmlFor="" className="label__student" >Email</label>
                                <input type="email"
                                    name='email'
                                    placeholder='correo electronico'
                                    className='input student_input'
                                    value={data.email}
                                    disabled
                                    // onChange={handleUpdate}
                                />
                                <label htmlFor="" className="label__student" >Celular</label>
                                <input type="number"
                                    name='phone'
                                    placeholder="Celular"
                                    className='input student_input'
                                    value={data.phone}
                                    // onChange={handleUpdate}
                                />
                            </div>                    
                        </section> 
                    
                    </section>
                    <section className="student_body">
                        {/* Apartado academico */ }
                        <div className="student__datos">
                            Formación Academica
                        </div>
                        <section className="form-group student__form">
                            {/* Universidad y Semestre */ }
                            <div className="form-column" >
                                <label htmlFor="" className="label__student" >Universidad</label>
                                <input type="text"
                                    name='university'
                                    placeholder='Nombre'
                                    className='input student_input'
                                    value={data.university}
                                    disabled
                                    // onChange={handleUpdate}
                                />
                                <label htmlFor="" className="label__student" >Semestre</label>
                                <input type="text"
                                    name='semestre'
                                    placeholder="Semestre"
                                    className='input student_input'
                                    value={data.semestre}
                                    // onChange={handleUpdate}
                                />
                            </div>

                            {/* Carrera y Año */ }
                            <div className="form-column" >
                                <label htmlFor="" className="label__student" >Carrera Profesional</label>
                                <input type="email"
                                    name='email'
                                    placeholder='Carrera Profesional'
                                    className='input student_input'
                                    value={data.career}
                                    
                                    // onChange={handleUpdate}
                                />
                                <label htmlFor="" className="label__student" >Año</label>
                                <input type="text"
                                    name='year'
                                    placeholder="PRIMERO"
                                    className='input student_input'
                                    value={data.year}
                                    // onChange={handleUpdate}
                                />
                            </div>                    
                        </section> 
                    </section>
                </>
                ) : (
                    <div>nelson</div>
                )

            }
        </form>
    )
}

export default Homeview
