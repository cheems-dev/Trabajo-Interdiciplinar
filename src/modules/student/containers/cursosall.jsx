import React, { useEffect, useState } from 'react'
import './css/cursosall.css'

const Cursosall = () => {

    const [curso, setCurso] = useState([])

    const getCursos = async () => {
        try {
            let response = await fetch('http://localhost:3001/cursos-all');
            if(response.status === 200) {
                let result = await response.json();
                console.log(result);
                setCurso(result.data)
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCursos()
    }, [])

    return (
        <div className="cursosall" >
            <section className="student__header">
                <h2>Cursos</h2>
            </section>
            <section className="cursosall__container">
                {
                    curso ? (
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
                    ) : (
                        <div>nel</div>
                    )
                }

            </section>
        </div>
    )
}

export default Cursosall
