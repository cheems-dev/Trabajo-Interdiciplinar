import React, { useEffect, useState } from 'react';
import './css/homeview.css';
import { AuthService } from '../../../services/Auth';
import { Link } from "react-router-dom";


function searchingTerm(term){
    return function(x){
        return x.name.includes(term) || !term;
    }
  }

const Homeview = (props) => {
    const _sAuth = new AuthService();
    const handleHistory = () => {
        props.history.push('/teacher/add')
    }
    
    const [data, setData] = useState([]);
    const [search,setSearch] =useState("");
    const [user, setUser]= useState("");
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
                setUser(token)
            }

        }catch(err) {
            console.log(err);
        }
    }
    const deleteTask=(token)=>{
        if(window.confirm('Are you sure you want to delete it?'))
        {
            fetch(`http://localhost:3001/silabo-delete/${token}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "token": token
            }
            })
            .then(data=>{
                console.log(data);
                getCursos(user);
            });
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
            <div className="container">
                <h1>Find by Silabus by name</h1>
                <input type="text" 
                placeholder="find by silabus by name"
                name="search"
                onChange={(e)=>setSearch(e.target.value)}/>
            </div>
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
                            data.filter(searchingTerm(search)).map(cur => (
                                <tr key={cur._id} >
                                    <td>{cur.name}</td>
                                    <td>{cur.silabo[0].title}</td>
                                    <td>{cur.silabo[0].year}</td>
                                    <td>{cur.silabo[0].semestre}</td>
                                    <td><a href={`${cur.silabo[0].pdfurl}`}>{cur.silabo[0].pdfname}</a></td>
                                    <td>
                                       
                                        <button onClick={()=>deleteTask(cur._id)}>delete</button>
                                    </td>
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
