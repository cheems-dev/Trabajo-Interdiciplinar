import React, { useState, useEffect, Component } from 'react'
import { Link } from 'react-router-dom'
import File from '../../../components/inputs/file';
import './css/addsilabus.css'
import { AuthService } from '../../../services/Auth';
import Swal from 'sweetalert2';
const AddSilabus = (props) => {

    const _sAuth = new AuthService();

    const [disabled, setDisabled] = useState(false)
    const [data, setData] = useState({
        objectSilab: {
            title: "",
            year: "",
            semestre: "",
            pdfname: "",
            pdfurl: ""
        },
        valid:true, 
        inputs: false
    })

    const [curso, setCurso] = useState({name: ''})

    const handleSelect = () => {
        setDisabled(!disabled)
    }

    const handleUpdate = (e) => {
        setData({
            ...data,
            objectSilab: {
                ...data.objectSilab,
                [e.target.name]: e.target.value
            },
            objectCurso: {
                ...data.objectCurso,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCurso = (e) => {
        if(e.target.name === 'name') {
            setCurso({[e.target.name]: e.target.value})
        }
    }

    const getFile = (file) => {
        setData({
            ...data, 
            objectSilab: {
                ...data.objectSilab,
                pdfname: file.name,
                pdfurl: file.url
            }, 
            valid: false, 
            inputs: true
        })
    }

    let classList  = ''
    if(data.valid) {
        classList = ['btn-submit disabled']
    }else {
        classList = 'btn-submit'
    }

    const successFetch = async (silabo, token) => {        
        try {
            let requestOptions = {
                method: 'POST', 
                body: JSON.stringify(silabo), 
                headers: {
                    'Content-Type': 'application/json',
                    "token": token
                }
            }
            let response = await fetch('http://localhost:3001/silabo-add', requestOptions)
            if(response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    text: 'Curso agregado exitosamente',
                    timer: 2000,
                    title: 'Exito'
                })
                props.history.push('/teacher')
            }   

        } catch(error) {    
            console.log(error);
            throw error
        }
    }

    const handleSubmit = (e) => {        
        e.preventDefault();
        let token = _sAuth.tokenTeacher;
        let silabo = data.objectSilab
        let body = {
            objectSilabo: silabo,
            objectCurso: curso
        }
        console.log(JSON.stringify(body));
        successFetch(body, token);            
    }

    return (
        <main className="silabus__container">
            <section className="silabus__top">
                <article>
                    <Link  to="/teacher" >regresar</Link>
                    <h2>Agregar Silabus</h2> 
                </article>               
            </section>
            
            <form className="form__container" 
                onSubmit={handleSubmit}>
                <section className="form-group add">
                    <input type="text"
                        name='name'
                        placeholder='nombre del curso'
                        className='input' disabled={data.inputs}
                        onChange={handleCurso}
                    />
                    <input type="text"
                        name='title'
                        placeholder='Titulo'
                        className='input' disabled={data.inputs}
                        onChange={handleUpdate}
                    />
                    <select className="input select" name='year' disabled={data.inputs} onChange={handleUpdate}  onClick={handleSelect} >
                        <option value="0" disabled={disabled} >Seleccionar año</option>
                        <option value="PRIMER_AÑO">PRIMER AÑO</option>
                        <option value="SEGUNDO_AÑO">SECUNDO AÑO</option>
                        <option value="TERCER_AÑO">TERCER AÑO</option>
                        <option value="CUARTO_AÑO">CUARTO AÑO</option>
                        <option value="QUINTO_AÑO">QUINTO AÑO</option>
                    </select>
                    <select className="input select" name='semestre' disabled={data.inputs} onChange={handleUpdate}  onClick={handleSelect} >
                        <option value="0" disabled={disabled} >Seleccionar semestre</option>
                        <option value="PRIMER_SEMESTRE">PRIMER SEMESTRE</option>
                        <option value="SEGUNDO_SEMESTRE">SECUNDO SEMESTRE</option>
                        <option value="TERCER_SEMESTRE">TERCER SEMESTRE</option>
                        <option value="CUARTO_SEMESTRE">CUARTO SEMESTRE</option>
                        <option value="QUINTO_SEMESTRE">QUINTO SEMESTRE</option>
                        <option value="SEXTO_SEMESTRE">SEXTO SEMESTRE</option>
                        <option value="SETIMO_SEMESTRE">SETIMO SEMESTRE</option>
                        <option value="OCTAVO_SEMESTRE">OCTAVO SEMESTRE</option>
                        <option value="NOVENO_SEMESTRE">NOVENO SEMESTRE</option>
                        <option value="DECIMO_SEMESTRE">DECIMO SEMESTRE</option>
                    </select>
                    <File file={getFile} />
                    <button type='submit' disabled={data.valid} className={classList} >Agregar Silabus</button>
                </section>
            </form>
                    
            
        </main>
    )
}

export default AddSilabus
