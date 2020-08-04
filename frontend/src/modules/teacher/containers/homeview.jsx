import React, { useEffect, useState } from 'react';
import './css/homeview.css';
import { AuthService } from '../../../services/Auth';
    

const Homeview = (props) => {
    const _sAuth = new AuthService();
    const handleHistory = () => {
        props.history.push('/teacher/add')
    }
    
    const [data, setData] = useState([]);

    const getCursos = async (token) => {
        try {
            let requestOptions = {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }
            let response = await fetch('http://localhost:3001/cursos-teacher-all', requestOptions)
            if(response.status === 200) {
                let result = await response.json();
                setData(result.data)
            }

        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        let token = _sAuth.tokenTeacher;
        getCursos(token)
    }, [])

    return (
        <main className="silabus__container" >
            <section className="silabus__top">
                <h2>Silabus</h2>
                <button onClick={handleHistory} >Agregar Silabus</button>
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
