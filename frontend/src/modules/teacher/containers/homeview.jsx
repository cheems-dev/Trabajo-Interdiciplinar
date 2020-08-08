import React, { useEffect, useState } from 'react';//react
import './css/homeview.css';//estilo
import { AuthService } from '../../../services/Auth';//autenticacion
    

const Homeview = (props) => {
    const _sAuth = new AuthService();//autenticacion
    //historial de navegacion
    const handleHistory = () => {
        props.history.push('/teacher/add')
    }
    
    const [data, setData] = useState([]); //hook para lso datos

    //para obtener los cursos
    const getCursos = async (token) => {
        //autenticacion y metodo de envio
        try {
            let requestOptions = {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }
            let response = await fetch('http://localhost:3001/cursos-teacher-all', requestOptions) //trae los cursos
            if(response.status === 200) { //si tuvo exito
                let result = await response.json(); //espera a que se carguen los cursos en result
                setData(result.data) //guarda los cursos en el hook
            }
        //si gubo algun error
        }catch(err) {
            console.log(err);
        }
    }
    //inicializar
    useEffect(() => {
        let token = _sAuth.tokenTeacher;
        getCursos(token)
    }, [])

    //return
    return (
        <main className="silabus__container" >
            <section className="silabus__top">
                <h2>Silabus</h2>
                <button onClick={handleHistory} >Agregar Silabus</button> {/* Ruta para añadir un curso */}
            </section>
            <table className="table" >
                <thead>
                    <tr>
                        <th>
                            curso
                        </th>
                        <th>
                            Titulo
                        </th>
                        <th>
                            Año academico
                        </th>
                        <th>
                            Semestre
                        </th>
                        <th>
                            Archivos
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr> 
                </thead>
                <tbody>
                    {
                        //para mostrar los cursos
                        data ? (
                            data.map(cur => (
                                <tr key={cur._id} >
                                    <td>{cur.name}</td>
                                    <td>{cur.silabo[0].title}</td>
                                    <td>{cur.silabo[0].year}</td>
                                    <td>{cur.silabo[0].semestre}</td>
                                    <td><a href={`${cur.silabo[0].pdfurl}`}>{cur.silabo[0].pdfname}</a></td>
                                    <td>actions</td>
                                </tr>
                            ))
                        ) : (
                            <div>no hay cursitos</div>
                        )
                    }
                </tbody>
            </table>
        </main>
    )
}

export default Homeview
